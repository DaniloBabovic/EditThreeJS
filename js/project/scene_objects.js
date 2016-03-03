function isNull(val){ return isNone(val);}
function isEmpty(val){ return isNone(val);}
function isNone(val)
{
	if ( typeof( val ) == "undefined") return true;
	if ( val === null) return true;
	return false;
}

var AnimateTW = function(siteApp)
{
	var requestId = null;
	var timeTO = new Date().getTime();
	var needToClean = false;
	
	function free()
	{
		TWEEN.removeAll();
		if (requestId !== null)
		{
			window.cancelAnimationFrame(requestId);
			requestId = null;
		}
	}
	this.free = free;
	
	function start(duration)
	{
		needToClean = true;
		timeTO = new Date().getTime() + duration + 200;
	}
	this.start = start;
	
	function update()
	{
		TWEEN.update();
	    siteApp.render();
	}

	function animate()
	{

		requestId = requestAnimationFrame(animate);
		var mili = new Date().getTime();
		if (mili < timeTO)
		{
			update();
		}
		else if (needToClean == true)
		{
			needToClean = false;
			TWEEN.removeAll();
		}
	}
	animate();
}

var Sky = function(siteApp)
{
	var i = 0;
	function createMaterial( path ) 
	{
		var texture = new THREE.TextureLoader().load(path);
		var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5, fog: true } );
		return material; 
	}

	function loadMaterial(index, path ) 
	{
		var loader = new THREE.TextureLoader();
		loader.load( 
						path,
						function ( texture ) 
						{
							materials[index] = texture;
							i +=1;
							if (i == 6)
							{
								// Create a large cube
								var mesh = new THREE.Mesh 	( 
																new THREE.BoxGeometry( 2000, 2000, 2000, 1, 1, 1 ), 
																new THREE.MeshFaceMaterial( materials ) 
															);
								
								// Set the x scale to be -1, this will turn the cube inside out
								mesh.scale.set(-1,1,1);
								mesh.position.y = -100;
								mesh.rotation.y = Math.PI/2;
								siteApp.scene.add( mesh );
							}
						}
		);
	}

	var materials = [];

	var materials = [
		createMaterial( 'img/skyX55+x.png' ), // right
		createMaterial( 'img/skyX55-x.png' ), // left
		createMaterial( 'img/skyX55+y.png' ), // top
		createMaterial( 'img/skyX55-y.png' ), // bottom
		createMaterial( 'img/skyX55+z.png' ), // back
		createMaterial( 'img/skyX55-z.png' )  // front
	];
	
	// Create a large cube
	var mesh = new THREE.Mesh 	( 
									new THREE.BoxGeometry( 2000, 2000, 2000, 1, 1, 1 ), 
									new THREE.MeshFaceMaterial( materials ) 
								);
	
	// Set the x scale to be -1, this will turn the cube inside out
	mesh.scale.set(-1,1,1);
	mesh.position.y = -100;
	mesh.rotation.y = Math.PI/2;
	siteApp.scene.add( mesh );
}

var SetTextureRepeat = function(material, parameters)
{
	if (isNull(parameters.repeat_x) == true) return;
	if (isNull(parameters.repeat_y) == true) return;

	var texture = material.map;
	if (isNull(texture) == true) return;

	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( parameters.repeat_x, parameters.repeat_y );
	texture.name = parameters.mapName;

	//texture.needsUpdate = true;
}

var envMaps = (function () {

	var path = "img/SwedishRoyalCastle/";
	var format = '.jpg';
	var urls = [
		path + 'px' + format, 
		path + 'nx' + format,
		path + 'py' + format, 
		path + 'ny' + format,
		path + 'pz' + format, 
		path + 'nz' + format
	];
	var reflectionCube = new THREE.CubeTextureLoader().load( urls );
	reflectionCube.format = THREE.RGBFormat;

	var refractionCube = new THREE.CubeTextureLoader().load( urls );
	refractionCube.mapping = THREE.CubeRefractionMapping;
	refractionCube.format = THREE.RGBFormat;

	return {
		none : null,
		reflection : reflectionCube,
		refraction : refractionCube
	};

})();

var textureMaps = (function () {

	return {
		null: null,
		none : null,
		lavatile : new THREE.TextureLoader().load( "img/lavatile.jpg" ),
		checkerboard: new THREE.TextureLoader().load( "img/checkerboard.jpg" )
	};

})();

var envMapKeys = getObjectsKeys( envMaps );
var textureMapKeys = getObjectsKeys( textureMaps );

function updateTexture ( material, materialKey, textures ) 
{
	//material, 'envMap', envMaps
	//material['envMap'] = envMaps[0];
	return function ( key ) 
	{
		material[materialKey] = textures[key];
		material[materialKey].name =  key;
		//textures.minFilter = THREE.LinearFilter;
		material.needsUpdate = true;
		siteApp.render();
	};
}

function getObjectsKeys( obj ) 
{

	var keys = [];
	for ( var key in obj ) {
		if ( obj.hasOwnProperty( key ) ) {

			keys.push( key );

		}

	}

	return keys;
}

function clone( obj ) 
{
	if ( obj === null || typeof( obj ) !== 'object' || 'isActiveClone' in obj ) return obj;

	if ( obj instanceof Date )
    	var temp = new obj.constructor( ); //or new Date( obj );
  	else
    	var temp = obj.constructor( );

	for ( var key in obj ) 
	{
    	if ( Object.prototype.hasOwnProperty.call( obj, key ) ) 
    	{
      		obj['isActiveClone'] = null;
      		temp[key] = clone( obj[key] );
      		delete obj['isActiveClone'];
    	}
  	}
	return temp;
}

function disposeNode(node)
{
    if (node instanceof THREE.Camera)
    {
        node = undefined;
    }
    else if (node instanceof THREE.Light)
    {
        node.dispose ();
        node = undefined;
    }
    else if (node instanceof THREE.Mesh)
    {
        if (node.geometry)
        {
            node.geometry.dispose ();
            node.geometry = undefined;
        }

        if (node.material)
        {
            if (node.material instanceof THREE.MeshFaceMaterial)
            {
                node.material.materials.forEach (function (mtrl, idx)
                {
                    if (mtrl.map)           mtrl.map.dispose ();
                    if (mtrl.lightMap)      mtrl.lightMap.dispose ();
                    if (mtrl.bumpMap)       mtrl.bumpMap.dispose ();
                    if (mtrl.normalMap)     mtrl.normalMap.dispose ();
                    if (mtrl.specularMap)   mtrl.specularMap.dispose ();
                    if (mtrl.envMap)        mtrl.envMap.dispose ();

                    mtrl.dispose ();    // disposes any programs associated with the material
                    mtrl = undefined;
                });
            }
            else
            {
                if (node.material.map)          node.material.map.dispose ();
                if (node.material.lightMap)     node.material.lightMap.dispose ();
                if (node.material.bumpMap)      node.material.bumpMap.dispose ();
                if (node.material.normalMap)    node.material.normalMap.dispose ();
                if (node.material.specularMap)  node.material.specularMap.dispose ();
                if (node.material.envMap)       node.material.envMap.dispose ();

                node.material.dispose ();   // disposes any programs associated with the material
                node.material = undefined;
            }
        }

        node = undefined;
    }
    else if (node instanceof THREE.Object3D)
    {
        node = undefined;
    }
}

function disposeHierarchy(node, callback)
{
    for (var i = node.children.length - 1; i >= 0; i--)
    {
        var child = node.children[i];
        disposeHierarchy (child, callback);
        callback (child);
    }
}

var InsertGroup = function ( siteApp, sceneObjects, parameters)
{
	if (isNone(parameters) == true)
	{
		parameters = {
						position_x: 100, position_y: 0, position_z: 0,
						rotation_x: 0, rotation_y: 0, rotation_z: 0, 
						scale_x: 1, scale_y: 1, scale_z: 1, 
						
						parent: null,
						index: -1,
						codeName: 'not_set',
						time: new Date().getTime() + groupCount(),
						auto_label : sceneObjects.autoLabelGroup(),
						customName : ''
					};

	}

	var group = new THREE.Object3D();

	group.parameters = parameters;

	group.position.set(parameters.position_x, parameters.position_y, parameters.position_z);
	group.rotation.set(parameters.rotation_x, parameters.rotation_y, parameters.rotation_z);
	group.scale.set(parameters.scale_x, parameters.scale_y, parameters.scale_z);

	if (isNull(parameters.parent) == true)
	{
		siteApp.scene.add(group);
	}
	else
	{
		parameters.parent.add(group);
	}
	sceneObjects.group_array.push(group);

	function getItems3D()
	{
		var item_3d_childs = [];
		for (var i = 0; i < sceneObjects.item_3d_array.length; i++)
		{
			var item_3d = sceneObjects.item_3d_array[i];
			if (item_3d.parentGroup != null)
			{
				if (item_3d.parentGroup.uuid == group.uuid)
				{
					item_3d_childs.push(item_3d);
				}
			}
		}
		return item_3d_childs;
	}
	group.getItems3D = getItems3D;

	function getItems3D_Names()
	{
		var names = '';
		for (var i = 0; i < sceneObjects.item_3d_array.length; i++)
		{
			var item_3d = sceneObjects.item_3d_array[i];
			if (item_3d.parentGroup != null)
			{
				if (item_3d.parentGroup.uuid == group.uuid)
				{
					names += '\n' + item_3d.auto_label;
				}
			}
		}
		return names;
	}
	group.getItems3D_Names = getItems3D_Names;

	function absolutePosition()
	{
		return group.position;
	}
	group.absolutePosition = absolutePosition;

	group.isChild = function(group_)
	{
		var result = false;
		function isParentScene(g)
		{
			if (g.parent.uuid == group.uuid)
			{
				result = true;
			}
			else
			{
				if (g.parent.uuid == siteApp.scene.uuid)	
				{
					result = false;
				}
				else
				{
					isParentScene(g.parent);
				}
			}
		}
		isParentScene(group_);
		return result;
	}

	group.parentIsScene = function()
	{
		if (group.parent.uuid == siteApp.scene.uuid)
		{
			return true;
		}
		else
		{
			return false;	
		}
	}
	
	group.parentUUID = function()
	{
		return group.parent.uuid;
	}

	return group;
};

var Item3D = function (sceneObjects, object3D, customGroup)
{
	var _this = this;


	function absolutePosition()
	{
		function add(object3D)
		{
			v.addVectors(v, object3D.position);
			if (object3D.type != "Scene")
			{
				add(object3D.parent);
			};
		}
		var v = new THREE.Vector3(_this.position.x, _this.position.y, _this.position.z);
		add(_this.root.parent);
		return v;
	}
	this.absolutePosition = absolutePosition;

	function parentIsScene()
	{
		if (_this.root.parent.type == "Scene") return true;
		return false;
	}
	this.parentIsScene = parentIsScene;

	function init()
	{
		if (isNull(customGroup) == false)
		{
			_this.rootIsMesh = true;
			_this.root = customGroup;

			_this.mesh = object3D;

			_this.position = customGroup.position;
			_this.scale = customGroup.scale;
			_this.rotation = customGroup.rotation;

			_this.geometry_name = customGroup.geometry_name;
			_this.material_name = object3D.material.type;

			if (customGroup.parent.type == "Scene")
			{
				_this.parentGroup = null;
			}
			else
			{
				_this.parentGroup = customGroup.parent;
			}

			_this.auto_label = sceneObjects.autoLabel(_this.geometry_name);
			_this.group = customGroup;
		}
		else if (object3D.type == "Mesh")
		{
			_this.rootIsMesh = true;
			_this.root = object3D;
			_this.mesh = object3D;

			_this.position = _this.mesh.position;
			_this.scale = _this.mesh.scale;
			_this.rotation = _this.mesh.rotation;
			
			_this.geometry_name = object3D.geometry.type;
			_this.material_name = object3D.material.type;
			
			if (object3D.parent.type == "Scene")
			{
				_this.parentGroup = null;	
			}
			else
			{
				_this.parentGroup = object3D.parent;
			}
			_this.auto_label = sceneObjects.autoLabel(_this.geometry_name);
			_this.group = null;
		}
	}
	
	_this.groupCodeName = function()
	{
		if (_this.parentGroup == null)
		{
			return 'null';
		}
		else
		{
			return _this.parentGroup.parameters.codeName;
		}
	}

	init();
	return this;
};

var SceneObjects = function( siteApp )
{
	var _this = this;
	
	var item_3d_array = [];
	this.item_3d_array = item_3d_array;

	var group_array = [];
	this.group_array = group_array;
	
	var _max_group = 0;
	var _max_plain = 0;
	var _max_box = 0;
	var _max_sphere = 0;
	var _max_sphere_custom = 0;
	var _max_3d_text = 0;

	function autoLabel(geometryName)
	{
		if (geometryName == 'PlaneGeometry') return autoLabelPlain();
		if (geometryName == 'BoxGeometry') return autoLabelBox();
		if (geometryName == 'TextGeometry') return autoLabelText3D();
		if (geometryName == 'CustomSphere') return autoLabelSphereCustom();
		if (geometryName == 'SphereGeometry') return autoLabelSphere();
		if (geometryName == 'Group') return autoLabelGroup();
		return null;
	}
	this.autoLabel = autoLabel;
	
	function autoLabelGroup()
	{
		_max_group += 1;	
		return "Group " + _max_plain;
	}
	this.autoLabelGroup = autoLabelGroup;

	function autoLabelPlain()
	{
		_max_plain += 1;	
		return "Plain " + _max_plain;
	}
	this.autoLabelPlain = autoLabelPlain;

	function autoLabelBox()
	{
		_max_box += 1;	
		return "Box " + _max_box;
	}
	this.autoLabelBox = autoLabelBox;

	function autoLabelSphere()
	{
		_max_sphere += 1;	
		return "Sphere " + _max_sphere;
	}
	this.autoLabelSphere = autoLabelSphere;

	function autoLabelSphereCustom()
	{
		_max_sphere_custom += 1;	
		return "Sphere Custom " + _max_sphere_custom;
	}
	this.autoLabelSphereCustom = autoLabelSphereCustom;

	function autoLabelText3D()
	{
		_max_3d_text += 1;	
		return "Text 3D " + _max_3d_text;
	}
	this.autoLabelText3D = autoLabelText3D;

	var mirror = null;

	function render( )
	{
		if ( mirror !== null )
		{
			mirror.render( );
		}
	}
	this.render = render;

	function remove(item_3d)
	{
		item_3d.root.parent.remove(item_3d.root);
		for (var i = (item_3d_array.length - 1); i > -1; i--)
		{
			var item = item_3d_array[i];
			if (item_3d.root.uuid == item.root.uuid)
			{
				item_3d_array.splice(i, 1);
			}
		}
		disposeNode(item_3d.mesh);
		siteApp.render();
	}
	this.remove = remove;

	function removeGroup(group)
	{
		group.parent.remove(group);
		for (var i = (group_array.length - 1); i > -1; i--)
		{
			var item = group_array[i];
			if (item.uuid == group.uuid)
			{
				group_array.splice(i, 1);
			}
		}
		siteApp.render();
	}
	this.removeGroup = removeGroup;

	mirror = new Mirror( siteApp );

	var loadObjects = LoadObjects(siteApp, _this);
};