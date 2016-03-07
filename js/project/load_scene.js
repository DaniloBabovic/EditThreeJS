var InsertCylinderMesh = function ( siteApp, sceneObjects, parameters, paramMaterial )
{
	var scene = siteApp.scene;
	var meshMaterial;

	var material_name = parameters.material_name;
	var parentGroup = parameters.parentGroup;

	if ( material_name == "MeshPhongMaterial" )
	{
		meshMaterial = new THREE.MeshPhongMaterial( paramMaterial );
	}
	else
	{
		meshMaterial = new THREE.MeshLambertMaterial( paramMaterial );	
	}

	/*
		CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)

		radiusTop — Radius of the cylinder at the top. Default is 20.
		radiusBottom — Radius of the cylinder at the bottom. Default is 20.
		height — Height of the cylinder. Default is 100.
		radiusSegments — Number of segmented faces around the circumference of the cylinder. Default is 8
		heightSegments — Number of rows of faces along the height of the cylinder. Default is 1.
		openEnded — A Boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped.
		thetaStart — Start angle for first segment, default = 0 (three o'clock position).
		thetaLength — The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete cylinder.
	*/

	var geometry = new THREE.CylinderGeometry	( 	 
													parameters.radiusTop, parameters.radiusBottom, parameters.height, 
													parameters.radiusSegments, parameters.heightSegments,
													parameters.openEnded, parameters.thetaStart,
													parameters.thetaLength
												);
	new SetTextureRepeat( meshMaterial, parameters );

	var cylinder = new THREE.Mesh( geometry, meshMaterial );
	cylinder.parameters = parameters;

	cylinder.position.set( parameters.position_x, parameters.position_y, parameters.position_z );
	cylinder.rotation.set( parameters.rotation_x, parameters.rotation_y, parameters.rotation_z );
	cylinder.scale.set( parameters.scale_x, parameters.scale_y, parameters.scale_z );

	if ( isNull( parentGroup ) == true ) 
		scene.add( cylinder );
	else 
		parentGroup.add( cylinder );


	this.item_3d = new Item3D( sceneObjects, cylinder );
	sceneObjects.item_3d_array.push( this.item_3d );
	
	return this;

};

var InsertPlainMesh = function ( siteApp, sceneObjects, parameters, paramMaterial )
{
	var scene = siteApp.scene;
	var meshMaterial;

	var material_name = parameters.material_name;
	var parentGroup = parameters.parentGroup;

	if ( material_name == "MeshPhongMaterial" )
	{
		meshMaterial = new THREE.MeshPhongMaterial( paramMaterial );
	}
	else
	{
		meshMaterial = new THREE.MeshLambertMaterial( paramMaterial );	
	}

	var geometry = new THREE.PlaneGeometry	( 	 
												parameters.width, parameters.height, 
												parameters.widthSegments, parameters.heightSegments
											);
	/*
		width — Width along the X axis.
		height — Height along the Y axis.
		widthSegments — Optional. Default is 1. 
		heightSegments — Optional. Default is 1.
	*/
	new SetTextureRepeat( meshMaterial, parameters );

	var plane = new THREE.Mesh( geometry, meshMaterial );
	plane.parameters = parameters;

	plane.position.set( parameters.position_x, parameters.position_y, parameters.position_z );
	plane.rotation.set( parameters.rotation_x, parameters.rotation_y, parameters.rotation_z );
	plane.scale.set( parameters.scale_x, parameters.scale_y, parameters.scale_z );

	if ( isNull( parentGroup ) == true ) 
		scene.add( plane );
	else 
		parentGroup.add( plane );


	this.item_3d = new Item3D( sceneObjects, plane );
	sceneObjects.item_3d_array.push( this.item_3d );
	
	return this;
};

var InsertBoxMesh = function ( siteApp, sceneObjects, parameters, paramMaterial )
{
	var scene = siteApp.scene;
	var item_3d_array = sceneObjects.item_3d_array;

	var meshMaterial;

	var material_name = parameters.material_name;
	var parentGroup = parameters.parentGroup;

	if ( material_name == "MeshPhongMaterial" )
	{
		meshMaterial = new THREE.MeshPhongMaterial( paramMaterial );
	}
	else
	{
		meshMaterial = new THREE.MeshLambertMaterial( paramMaterial );	
	}
	new SetTextureRepeat( meshMaterial, parameters );

	var geometry = new THREE.BoxGeometry( 
											parameters.width, parameters.height, parameters.depth, 
											parameters.widthSegments, parameters.heightSegments, parameters.depthSegments 
										 );
	geometry.center( );
	generateVertexColors( geometry);
	
	var cube = new THREE.Mesh( geometry, meshMaterial );
	cube.parameters = parameters;

	cube.position.set( parameters.position_x, parameters.position_y, parameters.position_z );
	cube.rotation.set( parameters.rotation_x, parameters.rotation_y, parameters.rotation_z );
	cube.scale.set( parameters.scale_x, parameters.scale_y, parameters.scale_z );

	if ( isNull( parentGroup ) == true )
	{
		scene.add( cube );
	}
	else
	{
		parentGroup.add( cube );
	}

	this.item_3d = new Item3D( sceneObjects, cube );
	sceneObjects.item_3d_array.push( this.item_3d );

	return this;
};

var Insert3dText = function ( siteApp, sceneObjects, parameters, paramMaterial )
{
	var scene = siteApp.scene;
	var item_3d_array = sceneObjects.item_3d_array;

	var material_name = parameters.material_name;
	var parentGroup = parameters.parentGroup;

	var textGeometry = new THREE.TextGeometry( parameters.text, parameters );	
	textGeometry.center( );
	generateVertexColors( textGeometry);
	var mesh;
	var meshMaterial;
	if ( material_name == "MeshPhongMaterial" )
	{
		meshMaterial = new THREE.MeshPhongMaterial( paramMaterial );
	}
	else
	{
		meshMaterial = new THREE.MeshLambertMaterial( paramMaterial );	
	}
	new SetTextureRepeat( meshMaterial, parameters );

	mesh = new THREE.Mesh( textGeometry, meshMaterial );
	mesh.parameters = parameters;
	this.mesh = mesh;

	mesh.position.set( parameters.position_x, parameters.position_y, parameters.position_z );
	mesh.rotation.set( parameters.rotation_x, parameters.rotation_y, parameters.rotation_z );
	mesh.scale.set( parameters.scale_x, parameters.scale_y, parameters.scale_z );

	mesh.castShadow = true;
	siteApp.scene_objects_list.push( mesh );
	
	if ( isNull( parentGroup ) == true )
	{
		scene.add( mesh );
	}
	else
	{
		parentGroup.add( mesh );
	}

	this.item_3d = new Item3D( sceneObjects, mesh );
	sceneObjects.item_3d_array.push( this.item_3d );
	
	return this;
};

var Mirror = function ( siteApp )
{
	var scene = siteApp.scene;
	var cubeGeom = new THREE.CubeGeometry( 100, 100, 10, 1, 1, 1 );
	mirrorCubeCamera = new THREE.CubeCamera( 1, 5000, 1024 );
	// mirrorCubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
	scene.add( mirrorCubeCamera );

	var mirrorCubeMaterial = new THREE.MeshBasicMaterial( { envMap: mirrorCubeCamera.renderTarget } );
	mirrorCube = new THREE.Mesh( cubeGeom, mirrorCubeMaterial );
	mirrorCube.position.set( 10, 110, -300 );
	mirrorCubeCamera.position = mirrorCube.position;
	scene.add( mirrorCube );	

	mirrorCubeCamera.position.y = 100;
	mirrorCubeCamera.position.z = -500;

	function render( )
	{
		// mirrorCube.visible = false;
		// mirrorCubeCamera.updateCubeMap( siteApp.rendererGL, scene );
		// mirrorCube.visible = true;

		mirrorSphere.visible = false;
		mirrorSphereCamera.updateCubeMap( siteApp.rendererGL, scene );
		mirrorSphere.visible = true;
	}
	this.render = render;

	function renderAlias( )
	{
		mirrorSphere.visible = false;
		mirrorSphereCamera.updateCubeMap( siteApp.rendererAlias, scene );
		mirrorSphere.visible = true;
	}
	this.renderAlias = renderAlias;

	var sphereGeom =  new THREE.SphereGeometry( 24, 32, 16 ); // radius, segmentsWidth, segmentsHeight
	mirrorSphereCamera = new THREE.CubeCamera( 1, 10000, 128 );
	// mirrorCubeCamera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
	scene.add( mirrorSphereCamera );
	var mirrorSphereMaterial = new THREE.MeshBasicMaterial( { envMap: mirrorSphereCamera.renderTarget, transparent: true, opacity: 0.8 } );

	mirrorSphere = new THREE.Mesh( sphereGeom, mirrorSphereMaterial );
	mirrorSphere.position.set( 10, 110, -300 );
	mirrorSphereCamera.position = mirrorSphere.position;

	mirrorSphereCamera.position.x = 0;
	mirrorSphereCamera.position.y = 100;
	mirrorSphereCamera.position.z = -200;

	scene.add( mirrorSphere );
	mirrorCube.visible = false;
};

var InsertCustomSphere = function ( siteApp, sceneObjects, parameters, paramMaterial )
{
	var _this = this;
	var scene = siteApp.scene;
	var item_3d_array = sceneObjects.item_3d_array;

	var material_name = parameters.material_name;
	var parentGroup = parameters.parentGroup;

	//SPHERE	
	var geometry = new THREE.SphereGeometry( 
		parameters.radius, parameters.widthSegments,  parameters.heightSegments, 
		parameters.phiStart, parameters.phiLength,  parameters.thetaStart, parameters.thetaLength );

	var meshMaterial;

	if ( material_name == "MeshPhongMaterial" )
	{
		meshMaterial = new THREE.MeshPhongMaterial( paramMaterial );
	}
	else
	{
		meshMaterial = new THREE.MeshLambertMaterial( paramMaterial );	
	}
	new SetTextureRepeat( meshMaterial, parameters );

	var sphere = new THREE.Mesh( geometry, meshMaterial );
	sphere.parameters = parameters;
	//WIRES
	var wireGeometry = new THREE.WireframeGeometry( geometry );
	var wireMaterial = new THREE.LineBasicMaterial( { color: 0xCCCCCC } );
	var edgesMesh = new THREE.LineSegments( wireGeometry,  wireMaterial );

	//GROUP
	var sphereGroup = new THREE.Object3D( );
	sphereGroup.geometry_name = "CustomSphere";
	sphereGroup.add( edgesMesh );
	sphereGroup.add( sphere );

	sphereGroup.position.set( parameters.position_x, parameters.position_y, parameters.position_z );
	sphereGroup.rotation.set( parameters.rotation_x, parameters.rotation_y, parameters.rotation_z );
	sphereGroup.scale.set( parameters.scale_x, parameters.scale_y, parameters.scale_z );

	if ( isNull( parentGroup ) == true )
	{
		scene.add( sphereGroup );
	}
	else
	{
		parentGroup.add( sphereGroup );
	}

	_this.sphere = sphere;
	_this.sphereGroup = sphereGroup;
	
	this.item_3d = new Item3D( sceneObjects, sphere, sphereGroup );
	sceneObjects.item_3d_array.push( this.item_3d );

	return this;
};

var InsertSphere = function ( siteApp, sceneObjects, parameters, paramMaterial )
{
	var _this = this;
	var scene = siteApp.scene;
	var item_3d_array = sceneObjects.item_3d_array;

	var material_name = parameters.material_name;
	var parentGroup = parameters.parentGroup;

	//SPHERE	
	var geometry = new THREE.SphereGeometry(
		parameters.radius, parameters.widthSegments,  parameters.heightSegments, 
		parameters.phiStart, parameters.phiLength,  parameters.thetaStart, parameters.thetaLength
	);

	var meshMaterial = new THREE.MeshPhongMaterial( paramMaterial );
	new SetTextureRepeat( meshMaterial, parameters );
	
	var sphere = new THREE.Mesh( geometry, meshMaterial );
	sphere.parameters = parameters;

	sphere.position.set ( parameters.position_x, parameters.position_y, parameters.position_z );
	sphere.rotation.set ( parameters.rotation_x, parameters.rotation_y, parameters.rotation_z );
	sphere.scale.set 	( parameters.scale_x, parameters.scale_y, parameters.scale_z );

	if ( isNull( parentGroup ) == true )
	{
		scene.add( sphere );
	}
	else
	{
		parentGroup.add( sphere );
	}
	
	this.item_3d = new Item3D( sceneObjects, sphere );
	sceneObjects.item_3d_array.push( this.item_3d );
	
	_this.sphere = sphere;
	return this;
};

var LoadObjects = function( siteApp , sceneObjects )
{
	
	var parameters =
	{

		position_x: 0, position_y: 20, position_z: 40,
		rotation_x: 0, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1,
	
		parent: null,
		index: 0,
		codeName: "group_0",
		time: 12345678,
		auto_label: "Group 1",
		customName: "G1"
	}
	var group_0 = new InsertGroup( siteApp, sceneObjects, parameters );
	
	
	var parameters =
	{

		position_x: 0, position_y: 20, position_z: 40,
		rotation_x: 0, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1,
	
		parent: group_0,
		index: 1,
		codeName: "group_1",
		time: 12345678,
		auto_label: "Group delete me",
		customName: "G1"
	}
	var group_1 = new InsertGroup( siteApp, sceneObjects, parameters );
	
	
	var parameters =
	{

		position_x: 10, position_y: 40, position_z: -300,
		rotation_x: 0, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1,
	
		parent: null,
		index: 2,
		codeName: "group_2",
		time: 12345678,
		auto_label: "Group 2",
		customName: "G1"
	}
	var group_2 = new InsertGroup( siteApp, sceneObjects, parameters );
	
	
	var parameters =
	{
		material_name: "MeshPhongMaterial",
		parentGroup: group_0,
	
		text: "Edit 3.JS ", size:48, height: 4, curveSegments: 12,
		font: "helvetiker", weight: "bold",	style: "normal",
		bevelThickness: 2,	bevelSize: 1.5,	bevelSegments: 3, bevelEnabled: false,

		position_x: 0, position_y: 40, position_z: 0,
		rotation_x: 0, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1,
	};

	var paramMaterial = 
	{
		transparent : true,
		opacity : 1,

		color : 0xf2f2f2,
		specular : 0xffffff,
		emissive : 0xfffe00,
		emissiveIntensity : 0.48484848484848486,
		shininess : 25.252525252525253,

		vertexColors : 1, //THREE.NoColors, THREE.FaceColors, THREE.VertexColors
		side : 0, //THREE.FrontSide, THREE.BackSide, THREE.DoubleSide
		shading : 2, //THREE.SmoothShading, //THREE.FlatShading
		blending : 1, // NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending
		fog : true,
		wireframe : false,

		map: null,
		envMap : null,
		lightMap : null,
		specularMap : null,
		alphaMap : null,

		reflectivity : 1,
		refractionRatio : 0.98,

		polygonOffset : false,
		polygonOffsetFactor : 0,// positive value pushes polygon further away
		polygonOffsetUnits : 0
	};
	var text_3d = new Insert3dText( siteApp, sceneObjects, parameters, paramMaterial );
	
	var parameters =
	{
		material_name: "MeshPhongMaterial",
		repeat_x: 2,
		repeat_y: 2,
		mapName: "checkerboard",
		parentGroup: null,
	
		width: 1000, height:1000, widthSegments: 8, heightSegments: 8,

		position_x: 0, position_y: 10, position_z: 0,
		rotation_x: 1.571, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1,
	};

	var paramMaterial = 
	{
		transparent : false,
		opacity : 1,

		color : 0xffffff,
		specular : 0xfcfcfc,
		emissive : 0x281900,
		emissiveIntensity : 0.12121212121212122,
		shininess : 28.28282828282828,

		vertexColors : 0, //THREE.NoColors, THREE.FaceColors, THREE.VertexColors
		side : 1, //THREE.FrontSide, THREE.BackSide, THREE.DoubleSide
		shading : 2, //THREE.SmoothShading, //THREE.FlatShading
		blending : 1, // NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending
		fog : true,
		wireframe : false,

		map: textureMaps[ "checkerboard" ],
		envMap : null,
		lightMap : null,
		specularMap : null,
		alphaMap : null,

		reflectivity : 1,
		refractionRatio : 0.98,

		polygonOffset : false,
		polygonOffsetFactor : 0,// positive value pushes polygon further away
		polygonOffsetUnits : 0
	};
	var plainMesh = new InsertPlainMesh( siteApp, sceneObjects, parameters, paramMaterial );
	
	var parameters =
	{
		material_name: "MeshPhongMaterial",
		parentGroup: group_0,
	
		radius: 23, widthSegments:12, heightSegments: 12,
		phiStart: 2,
		phiLength: 2,
		thetaStart: 1,
		thetaLength: 2,


		position_x: 120, position_y: 62, position_z: 0,
		rotation_x: 0, rotation_y: 0, rotation_z: 0.977,
		scale_x: 1, scale_y: 1, scale_z: 1,
	};

	var paramMaterial = 
	{
		transparent : true,
		opacity : 1,

		color : 0xefff00,
		specular : 0xe1ff00,
		emissive : 0xfff000,
		emissiveIntensity : 0.4,
		shininess : 12,

		vertexColors : 1, //THREE.NoColors, THREE.FaceColors, THREE.VertexColors
		side : 2, //THREE.FrontSide, THREE.BackSide, THREE.DoubleSide
		shading : 2, //THREE.SmoothShading, //THREE.FlatShading
		blending : 1, // NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending
		fog : true,
		wireframe : true,

		map: null,
		envMap : null,
		lightMap : null,
		specularMap : null,
		alphaMap : null,

		reflectivity : 0.8,
		refractionRatio : 0.9,

		polygonOffset : true,
		polygonOffsetFactor : 1,// positive value pushes polygon further away
		polygonOffsetUnits : 1
	};
	var sphere = new InsertSphere( siteApp, sceneObjects, parameters, paramMaterial );
	
	var parameters =
	{
		material_name: "MeshPhongMaterial",
		parentGroup: group_2,
	
		radius: 36, widthSegments:8, heightSegments: 6,
		phiStart: 2,
		phiLength: 3.142,
		thetaStart: 0,
		thetaLength: 3.142,

		position_x: 0, position_y: 70, position_z: 0,
		rotation_x: 0, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1,
	};

	var paramMaterial = 
	{
		transparent : true,
		opacity : 1,

		color : 0x000000,
		specular : 0xffffff,
		emissive : 0x00008c,
		emissiveIntensity : 0.4,
		shininess : 12,

		vertexColors : 1, //THREE.NoColors, THREE.FaceColors, THREE.VertexColors
		side : 2, //THREE.FrontSide, THREE.BackSide, THREE.DoubleSide
		shading : 2, //THREE.SmoothShading, //THREE.FlatShading
		blending : 1, // NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending
		fog : true,
		wireframe : false,

		map: null,
		envMap : null,
		lightMap : null,
		specularMap : null,
		alphaMap : null,

		reflectivity : 0.8,
		refractionRatio : 0.9,

		polygonOffset : true,
		polygonOffsetFactor : 1,// positive value pushes polygon further away
		polygonOffsetUnits : 1
	};
	var sphere = new InsertCustomSphere( siteApp, sceneObjects, parameters, paramMaterial );
	
	var parameters =
	{
		material_name: "MeshPhongMaterial",
		parentGroup: group_2,
	
		width: 20, height:60, depth: 20,

		widthSegments: 6, // — Optional. Number of segmented faces along the width of the sides. Default is 1. 
		heightSegments: 16, // — Optional. Number of segmented faces along the height of the sides. Default is 1.
		depthSegments: 11, // — Optional. Number of segmented faces along the depth of the sides. Default is 1.

		position_x: 0, position_y: 0, position_z: 0,
		rotation_x: 0, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1,
	};

	var paramMaterial = 
	{
		transparent : true,
		opacity : 0.95,

		color : 0x000000,
		specular : 0xffffff,
		emissive : 0x00008c,
		emissiveIntensity : 0.4,
		shininess : 12,

		vertexColors : 0, //THREE.NoColors, THREE.FaceColors, THREE.VertexColors
		side : 0, //THREE.FrontSide, THREE.BackSide, THREE.DoubleSide
		shading : 2, //THREE.SmoothShading, //THREE.FlatShading
		blending : 1, // NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending
		fog : true,
		wireframe : true,

		map: null,
		envMap : null,
		lightMap : null,
		specularMap : null,
		alphaMap : null,

		reflectivity : 0.8,
		refractionRatio : 0.9,

		polygonOffset : false,
		polygonOffsetFactor : 1,// positive value pushes polygon further away
		polygonOffsetUnits : 1
	};
	var boxMesh = new InsertBoxMesh( siteApp, sceneObjects, parameters, paramMaterial );
	
	var parameters =
	{
		material_name: "MeshPhongMaterial",
		parentGroup: null,
	
		radius: 38.5045632273899, widthSegments:12, heightSegments: 12.98744107983753,
		phiStart: 4.977,
		phiLength: 2.813,
		thetaStart: 5.626,
		thetaLength: 3.029,


		position_x: -135, position_y: 60, position_z: 40,
		rotation_x: 0, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1,
	};

	var paramMaterial = 
	{
		transparent : true,
		opacity : 1,

		color : 0xffff00,
		specular : 0xffff00,
		emissive : 0xffff00,
		emissiveIntensity : 0.4,
		shininess : 12,

		vertexColors : 1, //THREE.NoColors, THREE.FaceColors, THREE.VertexColors
		side : 2, //THREE.FrontSide, THREE.BackSide, THREE.DoubleSide
		shading : 2, //THREE.SmoothShading, //THREE.FlatShading
		blending : 1, // NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending
		fog : true,
		wireframe : true,

		map: null,
		envMap : null,
		lightMap : null,
		specularMap : null,
		alphaMap : null,

		reflectivity : 0.8,
		refractionRatio : 0.9,

		polygonOffset : true,
		polygonOffsetFactor : 1,// positive value pushes polygon further away
		polygonOffsetUnits : 1
	};
	var sphere = new InsertSphere( siteApp, sceneObjects, parameters, paramMaterial );
	
	var parameters =
	{
		material_name: "MeshPhongMaterial",
		parentGroup: null,
	
		width: 287, height:18, depth: 20,

		widthSegments: 4, // — Optional. Number of segmented faces along the width of the sides. Default is 1. 
		heightSegments: 4, // — Optional. Number of segmented faces along the height of the sides. Default is 1.
		depthSegments: 4, // — Optional. Number of segmented faces along the depth of the sides. Default is 1.

		position_x: 5, position_y: 20, position_z: 40,
		rotation_x: 0, rotation_y: 0, rotation_z: 0,
		scale_x: 1, scale_y: 1, scale_z: 1,
	};

	var paramMaterial = 
	{
		transparent : false,
		opacity : 1,

		color : 0xfffe00,
		specular : 0xf0f0f0,
		emissive : 0xfff000,
		emissiveIntensity : 0.26262626262626265,
		shininess : 45.45454545454545,

		vertexColors : 0, //THREE.NoColors, THREE.FaceColors, THREE.VertexColors
		side : 0, //THREE.FrontSide, THREE.BackSide, THREE.DoubleSide
		shading : 2, //THREE.SmoothShading, //THREE.FlatShading
		blending : 1, // NoBlending, NormalBlending, AdditiveBlending, SubtractiveBlending, MultiplyBlending, CustomBlending
		fog : true,
		wireframe : false,

		map: null,
		envMap : null,
		lightMap : null,
		specularMap : null,
		alphaMap : null,

		reflectivity : 1,
		refractionRatio : 0.98,

		polygonOffset : false,
		polygonOffsetFactor : 0,// positive value pushes polygon further away
		polygonOffsetUnits : 0
	};
	var boxMesh = new InsertBoxMesh( siteApp, sceneObjects, parameters, paramMaterial );
 }
