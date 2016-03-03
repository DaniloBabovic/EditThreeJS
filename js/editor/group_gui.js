
var GroupChilds = function(groupRightGUI)
{
	var group = groupRightGUI.group;
	var topFolder = groupRightGUI.topFolder;

	var childFolder = topFolder.addFolder("Childs");

	var items = group.getItems3D();
	
	function addFolder(item_3d)
	{
		function open()
		{
			groupRightGUI.editorGUI.makeRightGUI_for_item_3d(item_3d);
		}
		childFolder.add({open: open}, "open").name(item_3d.auto_label);
	}
	for (var i = 0; i < items.length; i++)
	{
		var item_3d = items[i];
		addFolder(item_3d);
	}
	childFolder.open();
}

var GroupParent = function(editorGUI, group, topFolder, gui)
{
	var parentFolder = topFolder.addFolder("Parent");
	var scene = editorGUI.siteApp.scene;
	var folderS = [];

	function remove_()
	{
		for (var i = folderS.length - 1; i >= 0; i--) 
		{
			parentFolder.remove(folderS[i]);
		};
		folderS = [];		
	}

	function restart()
	{
		parentFolder.close();
		remove_();
		insert();

		updateDisplay(gui);
		parentFolder.open();
		editorGUI.leftMenu.leftMenuSelect.refresh();
	}

	function insertScene()
	{
		var isParent = false;
		if (group.parameters.parent == null) isParent = true;
		if (isParent)
		{
			function open()
			{
				new Dialog("Scene is root group.", "Scene is parent");
			}
			var sceneFolder = parentFolder.add({open: open}, "open").name("Scene is parent");
			folderS.push(sceneFolder);
		}
		else
		{
			var select = {selected: false};
			var parentGroup = parentFolder.add(select, "selected").name("Scene");
			parentGroup.onChange(   
									function(value) 
									{  
										group.parent.remove(group);
										scene.add(group);
										editorGUI.siteApp.render();
										group.parameters.parent = null;
										restart();
										//alert("parentGroup.onChange to Scene");
									}   
								);
			folderS.push(parentGroup);
		}
	}

	function insertParent(group_)
	{
		var isParent = false;
		if (group.parameters.parent != null)
		{
			if (group_.uuid == group.parameters.parent.uuid)
			{
				isParent = true;
			}
		}
		if (isParent)
		{
			function open()
			{
				editorGUI.makeRightGUI_for_group(group_);
			}
			var folder = parentFolder.add({open: open}, "open").name(group_.parameters.auto_label);
			folderS.push(folder);
		}
		else
		{
			var select = {selected: false};
			var parentGroup = parentFolder.add(select, "selected").name(group_.parameters.auto_label);
			parentGroup.onChange(   
									function(value) 
									{  
										group.parent.remove(group);
										group_.add(group);
										editorGUI.siteApp.render();
										group.parameters.parent = group_;
										restart();
										//alert("parentGroup.onChange");
									}   
								);
			folderS.push(parentGroup);
		}
	}
	
	function insert()
	{
		insertScene();
		var group_array = editorGUI.siteApp.sceneObjects.group_array;
		for (var i = 0; i < group_array.length; i++) 
		{
			var group_ = group_array[i];
			if (group_.uuid !== group.uuid)
			{
				if (group.isChild(group_) == false)
				{
					insertParent(group_);
				}
			}
		};
	}
	insert();
}

var GroupRightGUI = function(editorGUI, group)
{
	var _this = this;
	this.editorGUI = editorGUI;
	this.group = group;
	var scene = editorGUI.siteApp.scene;

	var topFolder;
	var parentFolder;
	var positionGUI;

	//Not inserted
	var gui = new dat.GUI({ autoPlace: false });
	gui.domElement.style["max-height"] = (window.innerHeight - 10) + 'px';
	gui.domElement.style["overflow-y"] = "scroll";

	this.gui = gui;
	editorGUI.right_top_div.appendChild(gui.domElement);

	editorGUI.siteApp.lookAt(group.position);

	function insertTopFolder()
	{
		topFolder = gui.addFolder(group.parameters.auto_label);	
		_this.topFolder = topFolder;
		topFolder.open();
	}

	function insertHelper()
	{
		var dir = new THREE.Vector3( 1, 0, 0 );
		var origin = new THREE.Vector3( 0, 0, 0 );
		var length = 20;
		var hex = 0xff0000;

		_this.arrowHelper0 = new THREE.ArrowHelper( dir, origin, length, hex, 4, 2 );
		group.add( _this.arrowHelper0 );

		var dir = new THREE.Vector3( 0, 1, 0 );
		var hex = 0x00ff00;
		_this.arrowHelper1 = new THREE.ArrowHelper( dir, origin, length, hex, 4, 2 );
		group.add( _this.arrowHelper1 );

		var dir = new THREE.Vector3( 0, 0, 1 );
		var hex = 0x0000ff;
		_this.arrowHelper2 = new THREE.ArrowHelper( dir, origin, length, hex, 4, 2 );
		group.add( _this.arrowHelper2 );

	}
	insertHelper();

	function removeHelper()
	{
		group.remove(_this.arrowHelper0);
		group.remove(_this.arrowHelper1);
		group.remove(_this.arrowHelper2);
	}

	insertTopFolder();
	
	new GroupParent(editorGUI, group, topFolder, gui);

	new GroupChilds(this, group);

	var groupInfo = { mesh: group, absolutePosition : group.absolutePosition}; 

	var positionGUI = new PositionGUI(editorGUI, gui, group, topFolder, "Position");
	new RotationGui( editorGUI, gui, groupInfo, topFolder );
	new ScaleGui(editorGUI, gui, groupInfo, topFolder);

	function select(){ editorGUI.siteApp.lookAt(groupInfo.absolutePosition()); }
	topFolder.add( {select: select}, 'select' ).name('Select');

	function remove_()
	{ 
		var names = group.getItems3D_Names();
		if (names != '')
		{
			var text = 'This group has childs:\n' + names + "\n\n";
			text += 'Remove them first';
			new Dialog(text, "First, remove childs.");
		}
		else
		{
			editorGUI.siteApp.sceneObjects.removeGroup(group);
			editorGUI.openLightAgain();
			editorGUI.leftMenu.leftMenuSelect.refresh();
		}
	}
	topFolder.add( {remove_: remove_}, 'remove_' ).name('Remove');


	function free()
	{
		removeHelper();
		gui.domElement.innerHTML = '';
	}
	this.free = free;


	return this;
}