var RemoveObject3d = function(editorGUI, item_3d)
{
	editorGUI.siteApp.lookAt(item_3d.absolutePosition());
	function remove()
	{
		editorGUI.openLightAgain();
		var remove_3d_objects = item_3d.remove_3d_objects;
		var remove_button = item_3d.remove_button;
		remove_3d_objects.remove(remove_button);
		
		var siteApp = editorGUI.siteApp;
		siteApp.sceneObjects.remove(item_3d);	

		var item_3d_folder = item_3d.item_3d_folder;
		var selectButton = item_3d.selectButton;
		item_3d_folder.remove(selectButton);
	}

	function onClick(val)
	{
		if ( val == 1 ) 
		{ 
			remove(); 
		}
		editorGUI.lookAtActive();	
	}
	new DialogYesNo("Do you want to remove " + item_3d.auto_label + "?", "Remove object from scene", onClick);
}	

var InsertNewText3D = function(editorGUI, remove_3d_objects, item_3d_folder)
{
	var siteApp = editorGUI.siteApp;
	var item_3d_array = siteApp.sceneObjects.item_3d_array;
	editorGUI.closeActiveControl();

	//text
	var parameters = 
	{
		materialType : "MeshPhongMaterial",//"MeshPhongMaterial", //MeshLambertMaterial

		text: "Text ...", size: 20, height: 3, curveSegments: 6,
		font: "helvetiker",	weight: "bold",	style: "normal",
		bevelThickness: 2,	bevelSize: 1.5,	bevelSegments: 3, bevelEnabled: false,
		material: 0, extrudeMaterial: 1,

		position_x: 10, position_y: 40, position_z: 40,
		rotation_x: 0, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1
	};

	var paramPhong = 
	{
		transparent : true, opacity : 1,

		color: 0x00b9ae, specular: 0x4d0707, 
		emissive: 0xFFFFFF, emissiveIntensity: 0.5, 
		shininess: 30,// 0-100

		vertexColors: THREE.FaceColors,
		side: THREE.FrontSide, //THREE.BackSide THREE.DoubleSide
		shading: THREE.SmoothShading, //THREE.FlatShading
		blending: THREE.NormalBlending,
		fog : true, 	wireframe : false

		//map : null, envMap : null,
		//lightMap : null, specularMap : null, alphaMap : null,
		//reflectivity: 0.8, refractionRatio: 0.9, //0-1
		// polygonOffset: false, polygonOffsetFactor: 1, // positive value pushes polygon further away
  		// polygonOffsetUnits: 1
	}
	var insert3dText = new Insert3dText( siteApp, siteApp.sceneObjects, parameters, paramPhong );
	var item_3d = insert3dText.item_3d;

	editorGUI.makeRightGUI_for_item_3d(insert3dText.item_3d);

	function select()
	{
		editorGUI.makeRightGUI_for_item_3d(item_3d);
	}
	item_3d.selectButton = item_3d_folder.add({select: select}, 'select').name(item_3d.auto_label);
	item_3d.item_3d_folder = item_3d_folder;

	function remove()
	{
		new RemoveObject3d(editorGUI, item_3d);
	}
	item_3d.remove_button = remove_3d_objects.add({remove: remove}, 'remove').name(item_3d.auto_label);
	item_3d.remove_3d_objects = remove_3d_objects;

	siteApp.render();	
}

var InsertNewSphere = function(editorGUI, remove_3d_objects, item_3d_folder)
{
	var siteApp = editorGUI.siteApp;
	var item_3d_array = siteApp.sceneObjects.item_3d_array;
	editorGUI.closeActiveControl();

	var parameters = 
	{
		materialType : "MeshPhongMaterial",//"MeshPhongMaterial", //MeshLambertMaterial

		radius: 23, widthSegments: 12, heightSegments: 12, 
		//phiStart: 0, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI,
		phiStart: 0, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI,

		position_x: 200, position_y: 50, position_z: 100,
		rotation_x: 0, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1
	};
	var paramPhong = 
	{
		transparent : true,
		opacity : 1,

		color: 0xFFFF00, 
		specular: 0xFFFF00, emissive: 0xFFFF00,
		emissiveIntensity: 0.4, shininess: 12,// 0-100

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

	var sphere = new InsertSphere( siteApp, siteApp.sceneObjects, parameters, paramPhong );
	var item_3d = sphere.item_3d;

	editorGUI.makeRightGUI_for_item_3d(sphere.item_3d);

	function select()
	{
		editorGUI.makeRightGUI_for_item_3d(item_3d);
	}
	item_3d.selectButton = item_3d_folder.add({select: select}, 'select').name(item_3d.auto_label);
	item_3d.item_3d_folder = item_3d_folder;

	function remove()
	{
		new RemoveObject3d(editorGUI, item_3d);
	}
	item_3d.remove_button = remove_3d_objects.add({remove: remove}, 'remove').name(item_3d.auto_label);
	item_3d.remove_3d_objects = remove_3d_objects;

	siteApp.render();	
}

var InsertNewPlain = function(editorGUI, remove_3d_objects, item_3d_folder)
{
	var siteApp = editorGUI.siteApp;
	var item_3d_array = siteApp.sceneObjects.item_3d_array;
	editorGUI.closeActiveControl();

	//Plain
	var parameters =	
	{
		materialType : "MeshLambertMaterial",

		width: 64, height: 64, widthSegments: 9, heightSegments: 9,

		position_x: 50, position_y: 20, position_z: 250,
		rotation_x: Math.PI/2, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1
	};
	var paramLambert = 
	{
		transparent : true,
		opacity : 0.9,

		color: 0xAAAAAA,  emissive: 0x10eb29,
		emissiveIntensity: 1,

		//vertexColors: THREE.FaceColors,
		side: THREE.DoubleSide, //THREE.BackSide THREE.DoubleSide
		//blending: THREE.NormalBlending,

		//map : null, envMap : null,
		//lightMap : null, specularMap : null, alphaMap : null,

		reflectivity: 0.8, refractionRatio: 0.9, //0-1

		fog : true, 	wireframe : false,

		polygonOffset: false, polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
	}
	var plainMesh = new InsertPlainMesh( siteApp, siteApp.sceneObjects, parameters, paramLambert );
	var item_3d = plainMesh.item_3d;

	editorGUI.makeRightGUI_for_item_3d(plainMesh.item_3d);

	function select()
	{
		editorGUI.makeRightGUI_for_item_3d(item_3d);
	}
	item_3d.selectButton = item_3d_folder.add({select: select}, 'select').name(item_3d.auto_label);
	item_3d.item_3d_folder = item_3d_folder;

	function remove()
	{
		new RemoveObject3d(editorGUI, item_3d);
	}
	item_3d.remove_button = remove_3d_objects.add({remove: remove}, 'remove').name(item_3d.auto_label);
	item_3d.remove_3d_objects = remove_3d_objects;

	siteApp.render();	
}

var InsertNewBox = function(editorGUI, remove_3d_objects, item_3d_folder)
{
	var siteApp = editorGUI.siteApp;
	var item_3d_array = siteApp.sceneObjects.item_3d_array;
	editorGUI.closeActiveControl();

	// //Box
	var parameters = 
	{
		materialType : "MeshPhongMaterial",//"MeshPhongMaterial", //MeshLambertMaterial

		width: 20, height: 60, depth: 20,		
		widthSegments: 6, // — Optional. Number of segmented faces along the width of the sides. Default is 1.
		heightSegments: 16, // — Optional. Number of segmented faces along the height of the sides. Default is 1.
		depthSegments: 11, // — Optional. Number of segmented faces along the depth of the sides. Default is 1.

		position_x: 100, position_y: 40, position_z: 100,
		rotation_x: 0, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1
	};
	var paramPhong = 
	{
		transparent : true,
		opacity : 0.95,

		color: 0x000000, 
		specular: 0xFFFFFF, emissive: 0x00008c,
		emissiveIntensity: 0.4, shininess: 12,// 0-100

		//vertexColors: THREE.FaceColors,
		side: THREE.FrontSide, //THREE.BackSide THREE.DoubleSide
		shading: THREE.SmoothShading, //THREE.FlatShading
		//blending: THREE.NormalBlending,

		//map : null, envMap : null,
		//lightMap : null, specularMap : null, alphaMap : null,

		reflectivity: 0.8, refractionRatio: 0.9, //0-1

		fog : true, 	wireframe : false,

		polygonOffset: false, polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
	}
	var boxMesh = new InsertBoxMesh( siteApp, siteApp.sceneObjects, parameters, paramPhong );

	var item_3d = boxMesh.item_3d;

	editorGUI.makeRightGUI_for_item_3d(boxMesh.item_3d);

	function select()
	{
		editorGUI.makeRightGUI_for_item_3d(item_3d);
	}
	item_3d.selectButton = item_3d_folder.add({select: select}, 'select').name(item_3d.auto_label);
	item_3d.item_3d_folder = item_3d_folder;

	function remove()
	{
		new RemoveObject3d(editorGUI, item_3d);
	}
	item_3d.remove_button = remove_3d_objects.add({remove: remove}, 'remove').name(item_3d.auto_label);
	item_3d.remove_3d_objects = remove_3d_objects;

	siteApp.render();	
}

var InsertNewCustomSphere = function(editorGUI, remove_3d_objects, item_3d_folder)
{
	var siteApp = editorGUI.siteApp;
	var item_3d_array = siteApp.sceneObjects.item_3d_array;
	editorGUI.closeActiveControl();

	var parameters = 
	{
		materialType : "MeshPhongMaterial",//"MeshPhongMaterial", //MeshLambertMaterial

		radius: 36, widthSegments: 8, heightSegments: 6, 
		//42, 8, 6, 2, Math.PI, 0, Math.PI
		phiStart: 2, phiLength: Math.PI, thetaStart: 0, thetaLength: Math.PI,


		position_x: -50, position_y: 110, position_z: 0,
		rotation_x: 0, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1
	};

	var paramPhong = 
	{
		transparent : true,
		opacity : 1,

		color: 0x000000, 
		specular: 0xFFFFFF, emissive: 0x00008c,
		emissiveIntensity: 0.4, shininess: 12,// 0-100

		vertexColors: THREE.FaceColors,
		side: THREE.DoubleSide, //THREE.FrontSide THREE.BackSide THREE.DoubleSide
		shading: THREE.FlatShading, //THREE.FlatShading
		blending: THREE.NormalBlending,

		map : null, envMap : null,
		lightMap : null, specularMap : null, alphaMap : null,

		reflectivity: 0.8, refractionRatio: 0.9, //0-1

		fog : true, 	wireframe : false,

		polygonOffset: true, polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
	}

	var customSphere = new InsertCustomSphere( siteApp, siteApp.sceneObjects, parameters, paramPhong );


	var item_3d = customSphere.item_3d;

	editorGUI.makeRightGUI_for_item_3d(customSphere.item_3d);

	function select()
	{
		editorGUI.makeRightGUI_for_item_3d(item_3d);
	}
	item_3d.selectButton = item_3d_folder.add({select: select}, 'select').name(item_3d.auto_label);
	item_3d.item_3d_folder = item_3d_folder;

	function remove()
	{
		new RemoveObject3d(editorGUI, item_3d);
	}
	item_3d.remove_button = remove_3d_objects.add({remove: remove}, 'remove').name(item_3d.auto_label);
	item_3d.remove_3d_objects = remove_3d_objects;

	siteApp.render();	
}