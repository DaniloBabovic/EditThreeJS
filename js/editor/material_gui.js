dat.GUI.prototype.removeFolder = function(name) 
{
	var folder = this.__folders[name];
	if (!folder) 
	{
		return;
	}
	folder.close();
	this.__ul.removeChild(folder.domElement.parentNode);
	delete this.__folders[name];
	this.onResize();
}

function getKeyFromObject(object, value)
{
	for(var key in object)
	{
		if (object[key] == value)
		{
			return key;
		}
	}
	return null;
}

var constants = 
{

	combine: 
	{

		"THREE.MultiplyOperation" : THREE.MultiplyOperation,
		"THREE.MixOperation" : THREE.MixOperation,
		"THREE.AddOperation" : THREE.AddOperation

	},

	side : 
	{

		"THREE.FrontSide" : THREE.FrontSide,
		"THREE.BackSide" : THREE.BackSide,
		"THREE.DoubleSide" : THREE.DoubleSide

	},

	shading : 
	{

		"THREE.FlatShading" : THREE.FlatShading,
		"THREE.SmoothShading" : THREE.SmoothShading

	},

	colors : 
	{

		"THREE.NoColors" : THREE.NoColors,
		"THREE.FaceColors" : THREE.FaceColors,
		"THREE.VertexColors" : THREE.VertexColors

	},

	blendingMode : 
	{

		"THREE.NoBlending" : THREE.NoBlending,
		"THREE.NormalBlending" : THREE.NormalBlending,
		"THREE.AdditiveBlending" : THREE.AdditiveBlending,
		"THREE.SubtractiveBlending" : THREE.SubtractiveBlending,
		"THREE.MultiplyBlending" : THREE.MultiplyBlending,
		"THREE.CustomBlending" : THREE.CustomBlending

	},

	equations : 
	{

		"THREE.AddEquation" : THREE.AddEquation,
		"THREE.SubtractEquation" : THREE.SubtractEquation,
		"THREE.ReverseSubtractEquation" : THREE.ReverseSubtractEquation

	},

	destinationFactors : 
	{

		"THREE.ZeroFactor" : THREE.ZeroFactor,
		"THREE.OneFactor" : THREE.OneFactor,
		"THREE.SrcColorFactor" : THREE.SrcColorFactor,
		"THREE.OneMinusSrcColorFactor" : THREE.OneMinusSrcColorFactor,
		"THREE.SrcAlphaFactor" : THREE.SrcAlphaFactor,
		"THREE.OneMinusSrcAlphaFactor" : THREE.OneMinusSrcAlphaFactor,
		"THREE.DstAlphaFactor" : THREE.DstAlphaFactor,
		"THREE.OneMinusDstAlphaFactor" : THREE.OneMinusDstAlphaFactor

	},

	sourceFactors : 
	{

		"THREE.DstColorFactor" : THREE.DstColorFactor,
		"THREE.OneMinusDstColorFactor" : THREE.OneMinusDstColorFactor,
		"THREE.SrcAlphaSaturateFactor" : THREE.SrcAlphaSaturateFactor

	}
};

function toRad(degrees) { return degrees * (Math.PI/180); }

function toDeg(radians) { return radians * (180/Math.PI); }

function toPercent(decimals) { return 100 * decimals; }

function toDecimals(percent) { return percent/100; }

function updateDisplay(gui) 
{
    for (var i in gui.__controllers) { gui.__controllers[i].updateDisplay(); }

    for (var f in gui.__folders) { updateDisplay(gui.__folders[f]); }
}

function generateVertexColors ( geometry ) {

	for ( var i=0, il = geometry.faces.length; i < il; i++ ) {

		geometry.faces[i].vertexColors.push( new THREE.Color().setHSL(
			i / il * Math.random(),
			0.5,
			0.5
		) );
		geometry.faces[i].vertexColors.push( new THREE.Color().setHSL(
			i / il * Math.random(),
			0.5,
			0.5
		) );
		geometry.faces[i].vertexColors.push( new THREE.Color().setHSL(
			i / il * Math.random(),
			0.5,
			0.5
		) );

		geometry.faces[i].color = new THREE.Color().setHSL(
			i / il * Math.random(),
			0.5,
			0.5
		);
	}
}

function needsUpdate ( material, geometry ) 
{
	return function () 
	{
		material.shading = +material.shading; //Ensure number
		material.vertexColors = +material.vertexColors; //Ensure number
		material.side = +material.side; //Ensure number
		material.needsUpdate = true;
		geometry.verticesNeedUpdate = true;
		geometry.normalsNeedUpdate = true;
		geometry.colorsNeedUpdate = true;
		siteApp.render();
	};
};

var MeshLambertMaterialGUI = function(item_3d_gui, parentFolder, changeMaterial, active_gui)
{
	var material;
	var geometry;

	material = item_3d_gui.item_3d.mesh.material;
	geometry = item_3d_gui.item_3d.mesh.geometry;
	
	//var material = item_3d_gui.mesh.material;
	//var geometry = item_3d_gui.mesh.geometry;

	generateVertexColors(geometry);
	

	if (changeMaterial)
	{
		if ( isNull(item_3d_gui.mesh.material) == false)
		{
			item_3d_gui.mesh.material.dispose();
		}
		material = new THREE.MeshLambertMaterial({color: 0xffffff});
		item_3d_gui.mesh.material = material;
	}

	var start_color = material.color.getHex();
	var start_emissive = material.emissive.getHex();
	var start_envMaps = envMapKeys;
	var start_map = textureMapKeys;
	var start_specularMap = textureMapKeys;
	var start_alphaMap = textureMapKeys;

	var topFolder = parentFolder.addFolder("Lambert");
	topFolder.open();

	var parameters = 
	{
		color : start_color,
		emissive : start_emissive,
		envMaps : start_envMaps,
		map : start_map,
		specularMap : start_specularMap,
		alphaMap : start_alphaMap
	};
	parameters["reset"] = reset;

	function reset()
	{
		function changeColor(value, color)
		{
			if (typeof value === "string") 
			{
				value = value.replace('#', '0x');
			}
			color = color.setHex( value );
		}

		parameters.color = start_color;
		changeColor(start_color, material.color);

		parameters.emissive = start_emissive;
		changeColor(start_emissive, material.emissive);

		material.wireframe = false;

		//vertexColors
		material.vertexColors = 0;
		material.needsUpdate = true;
		geometry.verticesNeedUpdate = true;
		geometry.normalsNeedUpdate = true;
		geometry.colorsNeedUpdate = true;

		material.reflectivity = 0.8;
		material.refractionRatio = 0.8;
			
		parameters.envMaps = start_envMaps;
		material['envMap'] = envMaps[0];
		material.needsUpdate = true;

		siteApp.render();
		updateDisplay(item_3d_gui.gui);
		updateDisplay(active_gui);
		
	}

	var envObj = {};
	
	var item_color = topFolder.addColor( parameters, 'color' );
	item_color.onChange	( 	
							function(value)
							{
								if (typeof value === "string") 
								{
									value = value.replace('#', '0x');
								}
								material.color = material.color.setHex( value );
								siteApp.render();
							} 
						);
														 
	var item_emissive = topFolder.addColor( parameters, 'emissive' );
	item_emissive.onChange	(	 
								function(value)
								{
									if (typeof value === "string") 
									{
										value = value.replace('#', '0x');
									}
									material.emissive = material.emissive.setHex( value );
									siteApp.render();	
								}
							);

	var item_wireframe = topFolder.add( material, 'wireframe' );
	item_wireframe.onChange( function(value){ siteApp.render(); } );

	var item_vertexColors = topFolder.add( material, 'vertexColors', constants.colors );
	item_vertexColors.onChange( needsUpdate( material, geometry ) );

	var item_envMaps = topFolder.add( parameters, 'envMaps', envMapKeys );
	item_envMaps.onChange( updateTexture( material, 'envMap', envMaps ) );
	
	var item_reflectivity = topFolder.add( material, 'reflectivity', 0, 1 );
	item_reflectivity.onChange( needsUpdate( material, geometry ) );

	var item_refractionRatio = topFolder.add( material, 'refractionRatio', 0, 1 );
	item_refractionRatio.onChange( needsUpdate( material, geometry ) );

	var item_reset = topFolder.add( parameters, 'reset' ).name("Reset");

	function remove()
	{
		topFolder.remove(item_color);
		topFolder.remove(item_emissive);
		topFolder.remove(item_wireframe);
		topFolder.remove(item_vertexColors);
		topFolder.remove(item_envMaps);
		topFolder.remove(item_reflectivity);
		topFolder.remove(item_refractionRatio);
		topFolder.remove(item_reset);
		parentFolder.removeFolder("Lambert");
	}
	this.remove = remove;
};

var MeshPhongGUI = function(item_3d_gui, parentFolder, changeMaterial, active_gui)
{
	var material;
	var geometry;

	material = item_3d_gui.item_3d.mesh.material;
	geometry = item_3d_gui.item_3d.mesh.geometry;


	generateVertexColors(geometry);

	if (changeMaterial)
	{
		item_3d_gui.mesh.material.dispose();
		item_3d_gui.mesh.material = new THREE.MeshPhongMaterial ( { color: 0x2194CE } );
		material = item_3d_gui.mesh.material;
	}

	var start_color = '#' + material.color.getHexString ();
	var start_emissive = '#' + material.emissive.getHexString ();
	var start_specular = '#' + material.specular.getHexString ();
	var start_emissiveIntensity = material.emissiveIntensity;
	var start_shininess = material.shininess;

	var start_map = null;
	var start_repeat_x = 1;
	var start_repeat_y = 1;
	
	if (isNull(material.map) == false)
	{
		start_repeat_x = material.map.repeat.x;
		start_repeat_y = material.map.repeat.y;
		start_map = material.map.name;
	}

	var start_envMaps = envMapKeys;

	var start_specularMap = textureMapKeys;
	var start_alphaMap = textureMapKeys;

	var topFolder = parentFolder.addFolder("Phong");
	topFolder.open();
	
	var parameters = 
	{
		color : start_color,
		emissive : start_emissive,
		specular : start_specular,
		envMaps : envMapKeys,
		
		map : start_map,
		repeat_x : start_repeat_x,
		repeat_y : start_repeat_y,

		lightMap : textureMapKeys,
		specularMap : textureMapKeys,
		alphaMap : textureMapKeys,
	};
	
	parameters["reset"] = reset;

	function reset()
	{
		function changeColor(value, color)
		{
			if (typeof value === "string") 
			{
				value = value.replace('#', '0x');
			}
			color = color.setHex( value );
		}
		parameters.color = start_color;
		changeColor(start_color, material.color);

		parameters.emissive = start_emissive;
		changeColor(start_emissive, material.emissive);

		parameters.specular = start_specular;
		changeColor(start_specular, material.specular);

		parameters.start_emissiveIntensity = start_emissiveIntensity;

		material.wireframe = false;

		//vertexColors
		material.vertexColors = 0;
		material.needsUpdate = true;
		geometry.verticesNeedUpdate = true;
		geometry.normalsNeedUpdate = true;
		geometry.colorsNeedUpdate = true;

		material.reflectivity = 0.8;
		material.refractionRatio = 0.8;
		material.emissiveIntensity = start_emissiveIntensity;
		material.shininess = start_shininess;

		repeat_x = start_repeat_x;
		repeat_y = start_repeat_y;

		parameters.envMaps = start_envMaps;
		material['envMap'] = envMaps[0];
		material.needsUpdate = true;

		siteApp.render();
		updateDisplay(item_3d_gui.gui);
		updateDisplay(active_gui);
	}

	var item_color = topFolder.addColor( parameters, 'color' );
	item_color.onChange	( 	
							function(value)
							{
								material.color =  new THREE.Color( value );
								siteApp.render();
							} 
						);

	var item_emissive = topFolder.addColor( parameters, 'emissive' );
	item_emissive.onChange	( 	
								function(value)
								{
									material.emissive = new THREE.Color( value );
									siteApp.render();
								} 
							);
	
	var item_emissiveIntensity = topFolder.add( material, 'emissiveIntensity', 0, 1);
	item_emissiveIntensity.onChange( 	
										function(val)
										{
											siteApp.render();
										}
									);

	var item_specular = topFolder.addColor( parameters, 'specular' );
	item_specular.onChange	( 	
								function(value)
								{
									material.specular = new THREE.Color( value );
									siteApp.render();
								} 
							);

	var item_shininess = topFolder.add( material, 'shininess', 0, 100);
	item_shininess.onChange( 	
								function(val)
								{
									siteApp.render();
								}
							);

	var item_wireframe = topFolder.add( material, 'wireframe' );
	item_wireframe.onChange	(function(value) { siteApp.render(); });
	
	var item_vertexColors = topFolder.add( material, 'vertexColors', constants.colors );
	item_vertexColors.onChange( needsUpdate( material, geometry ) );

	var item_Maps = topFolder.add( parameters, 'map', textureMapKeys );
	item_Maps .onChange( updateTexture( material, 'map', textureMaps ) );
	

	var item_repeat_x = topFolder.add( parameters, 'repeat_x').min(1).max(20).step(1);
	item_repeat_x .onChange(
								function(val)
								{
									parameters.repeat_x = val;
									if (isNull(material.map) == false)
									{
										var texture = material.map;
										texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
										texture.repeat.set( parameters.repeat_x, parameters.repeat_y );
										texture.needsUpdate = true;
										siteApp.render();
									}
								}
							 );

	var item_repeat_y = topFolder.add( parameters, 'repeat_x').min(1).max(20).step(1);
	item_repeat_y .onChange(
								function(val)
								{
									parameters.repeat_y = val;
									if (isNull(material.map) == false)
									{
										var texture = material.map;
										texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
										texture.repeat.set( parameters.repeat_x, parameters.repeat_y );
										texture.needsUpdate = true;
										siteApp.render();
									}
								}
							 );

	var item_envMaps = topFolder.add( parameters, 'envMaps', envMapKeys );
	item_envMaps .onChange( updateTexture( material, 'envMap', envMaps ) );

	var item_reflectivity = topFolder.add( material, 'reflectivity', 0, 1 );
	item_reflectivity.onChange( needsUpdate( material, geometry ) );

	var item_refractionRatio = topFolder.add( material, 'refractionRatio', 0, 1 );
	item_refractionRatio.onChange( needsUpdate( material, geometry ) );

	var item_reset = topFolder.add( parameters, 'reset' ).name("Reset");

	function remove()
	{
		topFolder.remove(item_color);
		topFolder.remove(item_emissive);
		topFolder.remove(item_specular);
		topFolder.remove(item_shininess);
		topFolder.remove(item_wireframe);
		topFolder.remove(item_vertexColors);
		topFolder.remove(item_envMaps);
		topFolder.remove(item_Maps);
		topFolder.remove(item_reflectivity);
		topFolder.remove(item_refractionRatio);
		topFolder.remove(item_reset);

		parentFolder.removeFolder("Phong");
	}
	this.remove = remove;
}

var ObjectMaterijal = function(item_3d_gui)
{
	function onClose()
	{
		//item_3d_gui.editorGUI.siteApp.lookAtReset();
	}

	function insertInActiveDIV()
	{
		item_3d_gui.editorGUI.insertActiveControl(active_gui.domElement, onClose);
		item_3d_gui.editorGUI.siteApp.lookAt(item_3d_gui.item_3d.absolutePosition());
	}

	var point =  item_3d_gui.topFolder.add({insertFunction:  insertInActiveDIV}, 'insertFunction' ).name("Material");

	//Not inserted
	var active_gui = new dat.GUI({ autoPlace: false, width: 270 });
	var topFolder = active_gui.addFolder("Material");
	topFolder.open();


	var materialGUI;
	function changeMaterial()
	{
		materialGUI.remove();
		if (parameters.material == "MeshPhongMaterial")
		{
			materialGUI = new MeshPhongGUI(item_3d_gui, topFolder, true, active_gui);
			objMaterial = item_3d_gui.mesh.material;
			siteApp.render();
		}
		if (parameters.material == "MeshLambertMaterial")
		{
			materialGUI = new MeshLambertMaterialGUI(item_3d_gui, topFolder, true, active_gui);
			objMaterial = item_3d_gui.mesh.material;
			siteApp.render();
		}
	}

	//var topFolder = item_3d_gui.topFolder.addFolder("Material");
	
	objMaterial = item_3d_gui.item_3d.mesh.material;
	
	var start_materialType = objMaterial.type;

	var start_transparent = objMaterial.transparent;
	var start_opacity = objMaterial.opacity;
	var start_visible = objMaterial.visible;
	var start_depthTest = objMaterial.depthTest;
	var start_depthWrite = objMaterial.depthWrite;
	var start_side = objMaterial.side;

	var parameters = 	{
							material: start_materialType, 
							transparent: start_transparent,
							opacity: start_opacity,
							visible: start_visible,
							depthTest: start_depthTest,
							depthWrite: start_depthWrite,			
							side: start_side
						};

	parameters["reset"] = reset;

	function reset()
	{
		parameters.material = start_materialType;

		parameters.transparent = start_transparent;
		objMaterial.transparent = start_transparent;

		parameters.opacity = start_opacity;
		objMaterial.opacity = start_opacity;

		parameters.visible = start_visible;
		objMaterial.visible = start_visible;

		parameters.depthTest = start_depthTest;
		objMaterial.depthTest = start_depthTest;

		parameters.depthWrite = start_depthWrite;
		objMaterial.depthWrite = start_depthWrite;

		
		var key = getKeyFromObject(constants.side, start_side);
		parameters.side = key;
		//objMaterial.side = constants.side[start_side];
		objMaterial.side = start_side;

		updateDisplay(active_gui);
		siteApp.render();
	}

	var obj_material = topFolder.add( parameters, 'material', [ "MeshLambertMaterial", "MeshPhongMaterial" ] ).name('Type');
	
	obj_material.onChange(  function(value) 
							{  
								parameters.material = value; 
								changeMaterial();  
							}   
						);
	
	var obj_transparent = topFolder.add( parameters, 'transparent').name('transparent');
	obj_transparent.onChange(  function(value) { parameters.transparent = value; 	objMaterial.transparent = value; siteApp.render();  } );
	
	var obj_opacity = topFolder.add( parameters, 'opacity').name('Opacity').min(0).max(1).step(0.1);
	obj_opacity.onChange(  function(value) { parameters.opacity = value; 	objMaterial.opacity = value; siteApp.render();  } );
	
	var obj_visible = topFolder.add( parameters, 'visible').name('visible');
	obj_visible.onChange(  function(value) { parameters.visible = value; 	objMaterial.visible = value; siteApp.render();  } );

	// var obj_depthTest = topFolder.add( parameters, 'depthTest').name('depthTest');
	// obj_depthTest.onChange(  function(value) { parameters.depthTest = value; 	objMaterial.depthTest = value; siteApp.render();  } );

	// var obj_depthWrite = topFolder.add( parameters, 'depthWrite').name('depthWrite');
	// obj_depthWrite.onChange(  function(value) { parameters.depthWrite = value; 	objMaterial.depthWrite = value; siteApp.render();  } );

	var obj_side = topFolder.add( parameters, 'side', [ "THREE.FrontSide", "THREE.BackSide", "THREE.DoubleSide"] ).name('Side');
	obj_side.onChange(  
						function(value) 
						{ 
							var val = THREE.FrontSide;
							if(value == "THREE.BackSide") val = THREE.BackSide;
							if(value == "THREE.DoubleSide") val = THREE.DoubleSide;
							parameters.side = value; 	
							objMaterial.side = val; 
							siteApp.render();  
						} 
					);

	topFolder.add( parameters, 'reset' ).name("Reset");

	if (start_materialType == "MeshLambertMaterial")
	{
		materialGUI = new MeshLambertMaterialGUI(item_3d_gui, topFolder, false, active_gui);
	}
	else if (start_materialType == "MeshPhongMaterial")
	{
		materialGUI = new MeshPhongGUI(item_3d_gui, topFolder, false, active_gui);
	}
};