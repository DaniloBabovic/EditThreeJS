
var  RepeatXY = function(makeLine, item_3d, tab)
{
	var material = item_3d.mesh.material;

	tab2 = tab + '	';
	if(isNull(material.map) == false)
	{
		makeLine.line_tab_0(tab2 + 'repeat_x: ' + material.map.repeat.x + ',\n');
		makeLine.line_tab_0(tab2 + 'repeat_y: ' + material.map.repeat.y + ',\n');
		makeLine.line_tab_0(tab2 + 'mapName: "' + material.map.name + '",\n');
	}	
}

var MapMaterialCode  = function(makeLine, material, tab)
{
	tab2 = tab + '	';
	if(isNull(material.map) == true)
	{
		makeLine.line_tab_0(tab2 + 'map: null,\n');		
	}
	else
	{
		makeLine.line_tab_0(tab2 + 'map: textureMaps["' + material.map.name + '"],\n');				
	}
}

var PositionCode = function(makeLine, tab)
{
	function insert(mesh)
	{
		var position = mesh.position;
		var rotation = mesh.rotation;
		var scale = mesh.scale;

		var txt = '\n' + tab +	'position_x: ' 		+	r3(position.x) + 
								', position_y: ' 	+ 	r3(position.y) + 
								', position_z: ' 	+ 	r3(position.z) + ',\n'; 

		makeLine.line_tab_0(txt);

		var txt =  tab + 	'rotation_x: ' 		+ 	r3(rotation.x) + 
							', rotation_y: ' 	+ 	r3(rotation.y) + 
							', rotation_z: ' 	+  	r3(rotation.z) + ',\n'; 

		makeLine.line_tab_0(txt);

		var txt =  tab + 	  'scale_x: ' 	+	r3(scale.x) + 
							', scale_y: '	+	r3(scale.y) + 
							', scale_z: ' 	+ 	r3(scale.z) + ',\n'; 

		makeLine.line_tab_0(txt);
	}
	this.insert = insert;
	return this;
}

var MeshPhongMaterialCode = function(makeLine, material, tab)
{
	/*
		var paramMaterial = 
		{
			transparent : true,
			opacity : 1,

			color: 0xFFFF00, 		
			specular: 0xFFFF00, 
			emissive: 0xFFFF00,
			emissiveIntensity: 0.4, 
			shininess: 12,// 0-100

			vertexColors: THREE.FaceColors,
			side: THREE.DoubleSide, //THREE.FrontSide THREE.BackSide THREE.DoubleSide
			shading: THREE.SmoothShading, //THREE.FlatShading THREE.SmoothShading
			blending: THREE.NormalBlending,

			map : null, envMap : null,
			lightMap : null, specularMap : null, alphaMap : null,

			reflectivity: 0.8, refractionRatio: 0.9, //0-1

			fog : true, 	wireframe : false,

			polygonOffset: true, polygonOffsetFactor: 1, // positive value pushes polygon further away
	        polygonOffsetUnits: 1
		}
	*/
	var ln = makeLine.line_tab_0;
	var tab2 = tab + '	';

	ln('\n');
	ln( tab + 	'var paramMaterial = \n');
	ln( tab + 	'{\n');
	ln( tab2 + 	'transparent : ' + material.transparent + ',\n');
	ln( tab2 + 	'opacity : ' + material.opacity + ',\n');
	
	ln('\n');

	ln( tab2 + 'color : 0x' + material.color.getHexString () + ',\n');
	ln( tab2 + 'specular : 0x' + material.specular.getHexString () + ',\n');
	ln( tab2 + 'emissive : 0x' + material.emissive.getHexString () + ',\n');
	ln( tab2 + 'emissiveIntensity : ' + material.emissiveIntensity + ',\n');
	ln( tab2 + 'shininess : ' + material.shininess + ',\n');

	ln('\n');

	ln( tab2 + 'vertexColors : ' + material.vertexColors + 
						', //THREE.NoColors, THREE.FaceColors, THREE.VertexColors\n');

	ln( tab2 + 'side : ' + material.side + 
						', //THREE.FrontSide, THREE.BackSide, THREE.DoubleSide\n');
	ln( tab2 + 'shading : ' + material.shading + 
						', //THREE.SmoothShading, //THREE.FlatShading\n');

	ln( tab2 + 	'blending : ' + material.blending + 
								', // NoBlending, NormalBlending, AdditiveBlending, ' + 
								'SubtractiveBlending, MultiplyBlending, CustomBlending\n');

	ln( tab2 + 'fog : ' + material.fog + ',\n');
	ln( tab2 + 'wireframe : ' + material.wireframe + ',\n');

	ln('\n');

	new MapMaterialCode(makeLine, material, tab);

	// var mapName = 'null'; 
	// if (isNull(material.map) == false) mapName = material.map.name;
	// ln( tab2 + 'map : ' + mapName + ',\n');

	// if (isNull(material.map) == false)
	// {
	// 	ln( tab2 + 'repeat_x : ' + material.map.repeat.x + ',\n');		
	// 	ln( tab2 + 'repeat_y : ' + material.map.repeat.y + ',\n');
	// }
	// else
	// {
	// 	ln( tab2 + 'repeat_x : 1,\n');		
	// 	ln( tab2 + 'repeat_y : 1,\n');		
	// }

	ln( tab2 + 'envMap : ' + material.envMap + ',\n');
	ln( tab2 + 'lightMap : ' + material.lightMap + ',\n');
	ln( tab2 + 'specularMap : ' + material.specularMap + ',\n');
	ln( tab2 + 'alphaMap : ' + material.alphaMap + ',\n');

	ln('\n');
	ln( tab2 + 'reflectivity : ' + material.reflectivity + ',\n');
	ln( tab2 + 'refractionRatio : ' + material.refractionRatio + ',\n');

	ln('\n');
	ln( tab2 + 'polygonOffset : ' + material.polygonOffset + ',\n');
	ln( tab2 + 'polygonOffsetFactor : ' + material.polygonOffsetFactor +
		 					',// positive value pushes polygon further away\n');

	ln( tab2 + 'polygonOffsetUnits : ' + material.polygonOffsetUnits + '\n');
	ln( tab + '};');
}

var MeshLambertMaterialCode = function(makeLine, material, tab)
{
	/*
		var paramMaterial = 
		{
			transparent : true,
			opacity : 0.3,

			color: 0xAAAAAA,  emissive: 0x10eb29,
			emissiveIntensity: 1,

			//vertexColors: THREE.FaceColors,
			side: THREE.DoubleSide, //THREE.BackSide THREE.DoubleSide
			//blending: THREE.NormalBlending,

			//map : null, envMap : null,
			//lightMap : null, specularMap : null, alphaMap : null,

			reflectivity: 0.8, refractionRatio: 0.9, //0-1

			fog : true, 	wireframe : true,

			polygonOffset: false, polygonOffsetFactor: 1, // positive value pushes polygon further away
	        polygonOffsetUnits: 1
		}
	*/
	var ln = makeLine.line_tab_0;
	var tab2 = tab + '	';

	ln('\n');
	ln(  tab + 'var paramMaterial = \n');
	ln(  tab + '{\n');
	ln(  tab + '	transparent : ' + material.transparent + ',\n');
	ln(  tab + '	opacity : ' + material.opacity + ',\n');
	ln('\n');
	ln(  tab + '	color : 0x' + material.color.getHexString () + ',\n');
	ln(  tab + '	emissive : 0x' + material.emissive.getHexString () + ',\n');
	ln(  tab + '	emissiveIntensity : 0x' + material.emissiveIntensity + ',\n');
	ln('\n');

	ln(  tab + '	vertexColors : ' + material.vertexColors +
					', //THREE.NoColors, THREE.FaceColors, THREE.VertexColors\n');

	ln(  tab + '	side : ' + material.side +
				', //THREE.FrontSide, THREE.BackSide, THREE.DoubleSide\n');
	
	ln(  tab + '	blending : ' + material.blending +
					', // NoBlending, NormalBlending, AdditiveBlending, ' +
					'SubtractiveBlending, MultiplyBlending, CustomBlending\n');

	ln(  tab + '	fog : ' + material.fog + ',\n');
	ln(  tab + '	wireframe : ' + material.wireframe + ',\n');

	ln('\n');

	//ln(  tab + '	map : ' + material.map + ',\n');
	new MapMaterialCode(makeLine, material, tab);

	ln(  tab + '	envMap : ' + material.envMap + ',\n');
	ln(  tab + '	lightMap : ' + material.lightMap + ',\n');
	ln(  tab + '	specularMap : ' + material.specularMap + ',\n');
	ln(  tab + '	alphaMap : ' + material.alphaMap + ',\n');

	ln('\n');
	ln(  tab + '	reflectivity : ' + material.reflectivity + ',\n');
	ln(  tab + '	refractionRatio : ' + material.refractionRatio + ',\n');

	ln('\n');
	ln(  tab + '	polygonOffset : ' + material.polygonOffset + ',\n');
	ln(  tab + '	polygonOffsetFactor : ' + material.polygonOffsetFactor +
		 						',// positive value pushes polygon further away\n');

	ln(  tab + '	polygonOffsetUnits : ' + material.polygonOffsetUnits + ',\n');
	ln(  tab + '};');
}

var PlainCode = function(makeLine, item_3d, tab)
{
	var positionCode = new PositionCode(makeLine, tab + '	');
	var mesh = item_3d.mesh;
	var geometry = mesh.geometry;
	//var p = mesh._planeParams;
	var p = geometry.parameters;
	var ln = makeLine.line_tab_0;

	/*
		/Plain
		var parameters =
		{
			materialType : "MeshLambertMaterial",

			width: 64, height: 64, widthSegments: 9, heightSegments: 9,

			position_x: -250, position_y: 20, position_z: 50,
			rotation_x: Math.PI/2, rotation_y: 0, rotation_z: 0,
			scale_x: 1, scale_y: 1, scale_z: 1
		};
	*/
	var tab2 = 	tab + '	';
		
	ln( tab + '\n');
	ln( tab + 'var parameters =\n');
	ln( tab + '{\n');

	ln( tab2 + 'material_name: "' + mesh._planeParams.material_name + '",\n');

	new RepeatXY(makeLine, item_3d, tab);

	if ( isNull(mesh._planeParams.parentGroup) == true )
		ln( tab2 + 'parentGroup: null,\n');
	else
		ln( tab2 + 'parentGroup: ' + mesh._planeParams.parentGroup.parameters.codeName + ',\n');

	ln( tab + '\n');

	var text = 	tab2 + 	
				'width: ' 			+ p.width + ', ' + 
				'height:' 			+ p.height + ', ' + 
				'widthSegments: ' 	+ p.widthSegments + ', ' + 
				'heightSegments: ' 	+ p.heightSegments + ',' + 
				'\n';
				
	ln(text);
	positionCode.insert(mesh);
	ln( tab + '};\n');

	var materialType = mesh.material.type;
	if (materialType == 'MeshPhongMaterial')
	{
		new MeshPhongMaterialCode(makeLine, mesh.material, tab);
	}
	else if (materialType == 'MeshLambertMaterial')
	{
		new MeshLambertMaterialCode(makeLine, mesh.material, tab);
	}
	ln( tab + 	'var plainMesh = new InsertPlainMesh( siteApp, sceneObjects, parameters, paramMaterial );\n');
}

var BoxCode = function(makeLine, item_3d, tab)
{

	var positionCode = new PositionCode(makeLine, tab + '	');
	var mesh = item_3d.mesh;
	var p = mesh.geometry.parameters;
	var ln = makeLine.line_tab_0;
	/*
		var parameters = 
		{
			materialType : "MeshPhongMaterial",//"MeshPhongMaterial", //MeshLambertMaterial

			width: 20, height: 60, depth: 20,		
			widthSegments: 6, // — Optional. Number of segmented faces along the width of the sides. Default is 1.
			heightSegments: 16, // — Optional. Number of segmented faces along the height of the sides. Default is 1.
			depthSegments: 11, // — Optional. Number of segmented faces along the depth of the sides. Default is 1.

			position_x: 10, position_y: 40, position_z: -300,
			rotation_x: 0, rotation_y: 0, rotation_z: 0,
			scale_x: 1, scale_y: 1, scale_z: 1
		};
	*/
	var tab2 = 	tab + '	';

	ln( tab + '\n');
	ln( tab + 'var parameters =\n');
	ln( tab + '{\n');


	ln( tab2 + 'material_name: "' + mesh._boxParams.material_name + '",\n');
	new RepeatXY(makeLine, item_3d, tab);

	if ( isNull(mesh._boxParams.parentGroup) == true )
		ln( tab2 + 'parentGroup: null,\n');
	else
		ln( tab2 + 'parentGroup: ' + mesh._boxParams.parentGroup.parameters.codeName + ',\n');

	ln( tab + '\n');

	var text = 	tab2 + 	
				'width: ' + p.width + ', ' + 
				'height:' + p.height + ', ' + 
				'depth: ' + p.depth + ',\n' + 
				'\n' +
				tab2 + 'widthSegments: ' + p.widthSegments + ', ' +
						'// — Optional. Number of segmented faces along the width of the sides. Default is 1. \n' +
				
				tab2 + 'heightSegments: ' + p.heightSegments + ', ' +
						'// — Optional. Number of segmented faces along the height of the sides. Default is 1.\n' +
				
				tab2 + 'depthSegments: ' + p.depthSegments + ', ' +
				'// — Optional. Number of segmented faces along the depth of the sides. Default is 1.\n';

	ln(text);
	positionCode.insert(mesh);
	ln( tab + '};\n');

	var materialType = mesh.material.type;
	if (materialType == 'MeshPhongMaterial')
	{
		new MeshPhongMaterialCode(makeLine, mesh.material, tab);
	}
	else if (materialType == 'MeshLambertMaterial')
	{
		new MeshLambertMaterialCode(makeLine, mesh.material, tab);
	}
	ln( tab + 'var boxMesh = new InsertBoxMesh( siteApp, sceneObjects, parameters, paramMaterial );\n');

}

var Text3DCode = function(makeLine, item_3d, tab)
{
	var positionCode = new PositionCode(makeLine, tab + '	');
	var mesh = item_3d.mesh;
	var geometry = mesh.geometry;
	var ln = makeLine.line_tab_0;
	/*
		var parameters = 
		{
			materialType : "MeshPhongMaterial",//"MeshPhongMaterial", //MeshLambertMaterial

			text: "Hello", size: 40, height: 3, curveSegments: 12,
			font: "helvetiker",	weight: "bold",	style: "normal",
			bevelThickness: 2,	bevelSize: 1.5,	bevelSegments: 3, bevelEnabled: false,
			material: 0, extrudeMaterial: 1,

			position_x: 10, position_y: 40, position_z: -40,
			rotation_x: 0, rotation_y: 0, rotation_z: 0,
			scale_x: 1, scale_y: 1, scale_z: 1
		};
	*/
	var tab2 = tab + '	';

	var p = mesh._textParams;
	ln( tab + '\n');
	ln( tab + 'var parameters =\n');
	ln( tab + '{\n');

	ln( tab2 + 'material_name: "' + mesh._textParams.material_name + '",\n');
	new RepeatXY(makeLine, item_3d, tab);

	if ( isNull(mesh._textParams.parentGroup) == true )
		ln( tab2 + 'parentGroup: null,\n');
	else
		ln( tab2 + 'parentGroup: ' + mesh._textParams.parentGroup.parameters.codeName + ',\n');

	ln( tab + '\n');

	var text = tab + 	'\ttext: "' + p.text + 
						'", size:' + p.size + 
						', height: ' + p.height + 
						', curveSegments: ' + p.curveSegments + ',\n';

	ln(text);

	var text = tab + 	'\tfont: "' + p.font + 
						'", weight: "' + p.weight + 
						'",	style: "' + p.style + '",\n';

	ln(text);

	var text = tab + 	'\tbevelThickness: ' + p.bevelThickness + 
						',	bevelSize: ' + p.bevelSize + 
						',	bevelSegments: ' + p.bevelSegments + 
						', bevelEnabled: ' + p.bevelEnabled + ',\n';

	ln(text);

	var text = 	 tab + 	'\tmaterial: ' + p.material + 
						', extrudeMaterial: ' + p.extrudeMaterial + ',\n\n';

	positionCode.insert(mesh);
	makeLine.line_tab_0( tab + '};\n');

	var materialType = mesh.material.type;
	if (materialType == 'MeshPhongMaterial')
	{
		new MeshPhongMaterialCode(makeLine, mesh.material, tab);
	}
	else if (materialType == 'MeshLambertMaterial')
	{
		new MeshLambertMaterialCode(makeLine, mesh.material, tab);
	}
	ln( tab + 'var text_3d = new Insert3dText( siteApp, sceneObjects, parameters, paramMaterial );\n');
};

var SphereCode = function(makeLine, item_3d, tab)
{
	var positionCode = new PositionCode(makeLine, tab + '	');
	var mesh = item_3d.mesh;
	var geometry = mesh.geometry;
	var p = mesh.geometry.parameters;
	var ln = makeLine.line_tab_0;

	/*
		//Sphere
		var parameters = 
		{
			materialType : "MeshPhongMaterial",//"MeshPhongMaterial", //MeshLambertMaterial

			radius: 23, widthSegments: 12, heightSegments: 12, 
			//phiStart: 0, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI,
			phiStart: 2, phiLength: 2, thetaStart: 1, thetaLength: 2,

			position_x: 200, position_y: 50, position_z: -100,
			rotation_x: 0, rotation_y: 0, rotation_z: 0,
			scale_x: 1, scale_y: 1, scale_z: 1
		};
	*/
	var tab2 = tab + '	';
	ln( tab + '\n');
	ln( tab + 'var parameters =\n');
	ln( tab + '{\n');

	
	ln( tab2 + 'material_name: "' + mesh._sphereParams.material_name + '",\n');
	new RepeatXY(makeLine, item_3d, tab);

	if ( isNull(mesh._sphereParams.parentGroup) == true )
		ln( tab2 + 'parentGroup: null,\n');
	else
		ln( tab2 + 'parentGroup: ' + mesh._sphereParams.parentGroup.parameters.codeName + ',\n');

	ln( tab + '\n');

	var tab2 = 	tab + '	';
	var text = 	tab2 + 	
				'radius: ' 			+ p.radius + ', ' + 
				'widthSegments:' 	+ p.widthSegments + ', ' + 
				'heightSegments: ' 	+ p.heightSegments + ',\n' + 

				tab2 + 'phiStart: ' 		+ r3(p.phiStart) + ',\n' + 
				tab2 + 'phiLength: ' 		+ r3(p.phiLength) + ',\n' + 
				tab2 + 'thetaStart: ' 		+ r3(p.thetaStart) + ',\n' + 
				tab2 + 'thetaLength: ' 		+ r3(p.thetaLength) + ',\n' + 
				'\n';
				
	ln(text);
	positionCode.insert(mesh);
	ln( tab + '};\n');

	var materialType = mesh.material.type;
	if (materialType == 'MeshPhongMaterial')
	{
		new MeshPhongMaterialCode(makeLine, mesh.material, tab);
	}
	else if (materialType == 'MeshLambertMaterial')
	{
		new MeshLambertMaterialCode(makeLine, mesh.material, tab);
	}
	ln( tab + 'var sphere = new InsertSphere( siteApp, sceneObjects, parameters, paramMaterial );\n');
}

var CustomSphereCode = function(makeLine, item_3d, tab)
{
	var positionCode = new PositionCode(makeLine, tab + '	');
	var mesh = item_3d.mesh;
	var geometry = mesh.geometry;
	//var p = mesh._sphereParams;
	var p = geometry.parameters;
	var ln = makeLine.line_tab_0;
	/*
		//Sphere
		var parameters = 
		{
			materialType : "MeshPhongMaterial",//"MeshPhongMaterial", //MeshLambertMaterial

			radius: 23, widthSegments: 12, heightSegments: 12, 
			//phiStart: 0, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI,
			phiStart: 2, phiLength: 2, thetaStart: 1, thetaLength: 2,

			position_x: 200, position_y: 50, position_z: -100,
			rotation_x: 0, rotation_y: 0, rotation_z: 0,
			scale_x: 1, scale_y: 1, scale_z: 1
		};
	*/
	var tab2 = tab + '	';
	ln( tab + '\n');
	ln( tab + 'var parameters =\n');
	ln( tab + '{\n');

	//r3 is round function on three decimals
	ln( tab2 + 'material_name: "' + mesh._sphereParams.material_name + '",\n');
	new RepeatXY(makeLine, item_3d, tab);

	if ( isNull(mesh._sphereParams.parentGroup) == true )
		ln( tab2 + 'parentGroup: null,\n');
	else
		ln( tab2 + 'parentGroup: ' + mesh._sphereParams.parentGroup.parameters.codeName + ',\n');

	ln( tab + '\n');

	var tab2 = 	tab + '	';
	var text = 	tab2 + 	
				'radius: ' 			+ p.radius + ', ' + 
				'widthSegments:' 	+ p.widthSegments + ', ' + 
				'heightSegments: ' 	+ p.heightSegments + ',\n' + 

				tab2 + 'phiStart: ' 		+ r3(p.phiStart) + ',\n' + 
				tab2 + 'phiLength: ' 		+ r3(p.phiLength) + ',\n' + 
				tab2 + 'thetaStart: ' 		+ r3(p.thetaStart) + ',\n' + 
				tab2 + 'thetaLength: ' 		+ r3(p.thetaLength) + ',\n';
				
	ln(text);
	positionCode.insert(item_3d.group);
	ln( tab + '};\n');

	var materialType = mesh.material.type;
	if (materialType == 'MeshPhongMaterial')
	{
		new MeshPhongMaterialCode(makeLine, mesh.material, tab);
	}
	else if (materialType == 'MeshLambertMaterial')
	{
		new MeshLambertMaterialCode(makeLine, mesh.material, tab);
	}
	ln( tab + 	'var sphere = new InsertCustomSphere( siteApp, sceneObjects, parameters, paramMaterial );\n');
}

var MakeGroupsCode = function(makeDynamicCode, makeLine, tab)
{
	function insertGroup(group)
	{
		var tab2 = tab + '	';
		var ln = makeLine.line_tab_0;
		var positionCode = new PositionCode(makeLine, tab + '	');
		var parentName;
		var parentGroup = group.parameters.parent;
		if (parentGroup == null)
		{
			parentName = 'null';
		}
		else
		{
			parentName = parentGroup.parameters.codeName;
		}
		/*
			var parameters = {
								x: 0, y: 20, z: 40,
								rx: -Math.PI/6, ry: 0, rz: 0, 
								sx: 1, sy: 1, sz: 1, 
								
								parent: null,
								index: 0,
								codeName: 'not_set',
								time: 12345678,
								auto_label : "Group 1",
								customName : 'G1'
							};
		
			var group = new InsertGroup( siteApp, sceneObjects, parameters);
		*/

		ln( tab + '\n');
		ln( tab + 'var parameters =\n');
		ln( tab + '{\n');

		positionCode.insert(group);
		ln( tab + '\n');

		ln( tab2 + 'parent: ' + parentName + ',\n');
		ln( tab2 + 'index: ' + group.parameters.index + ',\n');
		ln( tab2 + 'codeName: "' + group.parameters.codeName + '",\n');
		ln( tab2 + 'time: ' + group.parameters.time + ',\n');
		ln( tab2 + 'auto_label: "' + group.parameters.auto_label + '",\n');
		ln( tab2 + 'customName: "' + group.parameters.customName + '"\n');
		ln( tab + '}\n');

		var groupCodeName = group.parameters.codeName;
		ln( tab + 'var ' + groupCodeName + ' = new InsertGroup( siteApp, sceneObjects, parameters);\n');
		ln( tab + '\n');

		for (var i = 0; i < group_array.length; i++) 
		{
			var child_group = group_array[i];
			if (child_group.parent.uuid == group.uuid)
			{
				insertGroup(child_group);
			}
		};
	}

	var item_3d_array = makeDynamicCode.item_3d_array;
	var group_array = makeDynamicCode.group_array;
	
	for (var i = 0; i < group_array.length; i++) 
	{
		var group = group_array[i];
		group.parameters.index = i;
		group.parameters.codeName = 'group_' + i;
	}

	for (var i = 0; i < group_array.length; i++) 
	{
		var group = group_array[i];
		if (group.parentIsScene() == true)
		{
			insertGroup(group);
		}
	};
}

var MakeDynamicCode = function(sceneObjectsJSBuilder)
{
	var _this = this;
	this.sceneObjectsJSBuilder = sceneObjectsJSBuilder;

	this.makeLine = sceneObjectsJSBuilder.makeLine;

	var makeLine = this.makeLine;
	var editorGUI = sceneObjectsJSBuilder.editorGUI;

	var siteApp = editorGUI.siteApp;
	var sceneObjects = siteApp.sceneObjects;
	var item_3d_array = sceneObjects.item_3d_array;
	var group_array = sceneObjects.group_array;

	this.item_3d_array = item_3d_array;
	this.group_array = group_array;

	var positionCode = new PositionCode(this);
	this.positionCode = positionCode;
	
	makeLine.line_tab_0('var LoadObjects = function( siteApp , sceneObjects )\n');
	makeLine.line_tab_0('{\n');

	new MakeGroupsCode(this, makeLine, '	');

	for (var i = 0; i < item_3d_array.length; i++)
	{
		var item = item_3d_array[i];
	
		var type = item.geometry_name;
		if (type == "TextGeometry")
		{
			new Text3DCode(makeLine, item, '	');
		}
		else if (type == "BoxGeometry")
		{
			new BoxCode(makeLine, item, '	');	
		}
		else if (type == "PlaneGeometry")
		{
			new PlainCode(makeLine, item, '	');
		}
		else if (type == "SphereGeometry")
		{
			new SphereCode(makeLine, item, '	');	
		}
		else if (type == "CustomSphere")
		{
			new CustomSphereCode(makeLine, item, '	');	
		}
	}
	makeLine.line_tab_0('\n}');
}