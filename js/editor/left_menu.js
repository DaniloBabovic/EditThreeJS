var LeftMenuSelect  = function(editorGUI, select_folder)
{
	var remove_sub_list = [];
	var remove_top_list = [];

	function refresh()
	{
		remove_();
		insert();
	}
	this.refresh = refresh;

	function remove_()
	{
		for (var i = remove_sub_list.length - 1; i >= 0; i--) 
		{
			var item = remove_sub_list[i];
			item[0].remove(item[1]);
		};
		for (var i = remove_top_list.length - 1; i >= 0; i--) 
		{
			var item = remove_top_list[i];
			item[0].removeFolder(item[1]);	
		};
		remove_sub_list = [];
		remove_top_list = [];
	}

	function insert()
	{
		function insertOpenLight()
		{
			function openLight()
			{
				editorGUI.openLightAgain();
			}
			light_button = select_folder.add({open: openLight}, 'open').name('Select Lights');
			remove_sub_list.push([select_folder, light_button]);
		}

		function insertGroupObjects(group, parentFolder)
		{
			var group_folder = parentFolder.addFolder(group.parameters.auto_label);
			remove_top_list.push([parentFolder, group.parameters.auto_label]);

			var childs = group.getItems3D();
			function open()
			{
				editorGUI.makeRightGUI_for_group(group);
			}
			var group_button = group_folder.add({open: open}, 'open').name("Menu");
			remove_sub_list.push([group_folder, group_button]);

			for (var  i = 0; i < childs.length; i++)
			{
				var item_3d = childs[i];
				insertSceeneObject(item_3d, group_folder);
			}
			group_folder.open();


			for (var i = 0; i < group_array.length; i++)
			{
				var sub_group = group_array[i];
				var sub_uuid = sub_group.parent.uuid;
				if (sub_uuid == group.uuid)
				{
					insertGroupObjects(sub_group, group_folder);
				}
			}
		}

		function insertSceeneObject(item_3d, item_3d_folder)
		{
			function openObject_3d(i)
			{
				editorGUI.makeRightGUI_for_item_3d(item_3d);
			}
			item_3d.selectButton = item_3d_folder.add({open: openObject_3d}, 'open').name( item_3d.auto_label );
			item_3d.item_3d_folder = item_3d_folder;

			remove_sub_list.push([item_3d_folder, item_3d.selectButton]);
		}

		function insertSelectCenter()
		{
			function select()
			{
				editorGUI.siteApp.lookAtReset();
			}
			var selectCenter = select_folder.add({select: select}, 'select').name( "Select center" );
			remove_sub_list.push([select_folder, selectCenter]);
		}

		var item_3d_array = editorGUI.siteApp.sceneObjects.item_3d_array;
		var group_array = editorGUI.siteApp.sceneObjects.group_array;


		
		insertSelectCenter();
		insertOpenLight();

		for (var i = 0; i < group_array.length; i++)
		{
			var group = group_array[i];
			if (group.parentIsScene())
			{
				insertGroupObjects(group, select_folder);
			}
		}

		var scene_folder = select_folder.addFolder('Scene');
		remove_top_list.push([select_folder, 'Scene']);

		for (var i = 0; i < item_3d_array.length; i++)
		{
			var item_3d = item_3d_array[i];
			if (item_3d.parentIsScene())
			{
				insertSceeneObject(item_3d, scene_folder);
			}
		}
		scene_folder.open();
	}
	insert();
};

var LeftMenu  = function(editorGUI)
{
	var _this = this;
	var siteApp = editorGUI.siteApp;

	var menu_gui_parent = new dat.GUI({ autoPlace: false });
	menu_gui_parent.domElement.style["max-height"] = (window.innerHeight - 10) + 'px';
	menu_gui_parent.domElement.style["overflow-y"] = "scroll";
	editorGUI.left_top_div.appendChild(menu_gui_parent.domElement);

	var new_button;

	var remove_button;
	var remove_lights;

	var remove_3d_objects;

	var light_button;
	var select_folder;
	var texture_folder;

	var helperFolder;
	var cameraFolder;

	var js_button;

	select_folder = menu_gui_parent.addFolder('Select');
	select_folder.open();

	function insertNew()
	{
		new_button = menu_gui_parent.addFolder('Add');
		function onNewSpot()
		{
			var addSpot = new AddSpotLight(editorGUI, remove_lights);
		}
		var new_spot_light = new_button.add({open: onNewSpot}, 'open').name('Spot light');

		function onNewPoint()
		{
			var addPoint = new AddPointLight(editorGUI, remove_lights);
		}
		var new_point_light = new_button.add({open: onNewPoint}, 'open').name('Point light');

		function onNewText3D()
		{
			new InsertNewText3D(editorGUI, remove_3d_objects, select_folder);
		}
		var new_text_3d = new_button.add({open: onNewText3D}, 'open').name('Text 3D');

		function onNewShereCustom()
		{
			new InsertNewCustomSphere(editorGUI, remove_3d_objects, select_folder);
		}
		var new_sphere_custom = new_button.add({open: onNewShereCustom}, 'open').name('Sphere custom');

		function onNewShere()
		{
			new InsertNewSphere(editorGUI, remove_3d_objects, select_folder);
		}
		var new_sphere = new_button.add({open: onNewShere}, 'open').name('Sphere');

		function onNewBox()
		{
			new InsertNewBox(editorGUI, remove_3d_objects, select_folder);
		}
		var new_cube = new_button.add({open: onNewBox}, 'open').name('Box');

		function onNewPlain()
		{
			new InsertNewPlain(editorGUI, remove_3d_objects, select_folder);
		}
		var new_plain = new_button.add({open: onNewPlain}, 'open').name('Plain');
	}

	function insertRemove()
	{
		remove_button = menu_gui_parent.addFolder('Remove');
		remove_lights = remove_button.addFolder('Lights');

		remove_3d_objects = remove_button.addFolder('3D Objects');
		function insert_lights()
		{	
			function insert_spot(spotLight)
			{
				function remove()
				{
					new RemoveSpotLight(editorGUI, spotLight);
				}
				spotLight.remove_button = remove_lights.add({remove: remove}, 'remove').name(spotLight.auto_label);	
				spotLight.remove_lights = remove_lights;
			}

			function insert_point(pointLight)
			{
				function remove()
				{
					new RemovePointLight(editorGUI, pointLight);
				}
				pointLight.remove_button = remove_lights.add({remove: remove}, 'remove').name(pointLight.auto_label);		
				pointLight.remove_lights = remove_lights;
			}

			for (var i = 0; i < siteApp.lights.spotLights.length; i++) 
			{
				var spotLight = siteApp.lights.spotLights[i];
				insert_spot(spotLight);
			};

			for (var i = 0; i < siteApp.lights.pointLights.length; i++) 
			{
				var pointLight = siteApp.lights.pointLights[i];
				insert_point(pointLight);
			};
		}

		function insert_3D_objects_in_remove()
		{
			function insert_object(item_3d)
			{
				function remove()
				{
					new RemoveObject3d(editorGUI, item_3d);
				}
				item_3d.remove_button = remove_3d_objects.add({remove: remove}, 'remove').name(item_3d.auto_label);
				item_3d.remove_3d_objects = remove_3d_objects;
			}
			var item_3d_array = editorGUI.siteApp.sceneObjects.item_3d_array;
			for (var i = 0; i < item_3d_array.length; i++) 
			{
				var item_3d = item_3d_array[i];
				insert_object(item_3d);
			};
		}
		insert_lights();
		insert_3D_objects_in_remove();
	}

	

	function insertTextures()
	{
		texture_folder = menu_gui_parent.addFolder('Textures');
	}

	function insertHelpers()
	{
		helperFolder = menu_gui_parent.addFolder('Helpers');
		function insertCamera()
		{
			cameraFolder = helperFolder.addFolder('Camera');
			var mesh = editorGUI.siteApp.controlsTarget;
			var positionGUI = new PositionGUI(
												editorGUI, 
												menu_gui_parent, 
												mesh, 
												cameraFolder, 
												"Camera target"
											);		
		}	
		insertCamera();
	}

	function insertJSCreate()
	{
		function open()
		{
			new SceneObjectsJSBuilder(editorGUI);
		}
		js_button = menu_gui_parent.add({open: open}, 'open').name('Create JS');
	}
	

	this.leftMenuSelect = new LeftMenuSelect(editorGUI, select_folder);

	insertNew();
	insertRemove();
	
	//insertTextures();

	insertHelpers();
	insertJSCreate();
};