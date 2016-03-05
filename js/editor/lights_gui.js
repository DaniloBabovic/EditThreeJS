var SpotLight = function( editorGUI, gui, spot_folder, index, light, target )
{
	var spotLightHelper = null;
	var vals = {};
	this.vals = vals;
	this.light = light;

	function onClose()
	{
		editorGUI.siteApp.lookAtReset();
		hideHelper();
	}

	function insertInActiveDIV()
	{
		editorGUI.insertActiveControl( active_gui.domElement, onClose );
		editorGUI.siteApp.lookAt( target.position );
		showHelper();
	}
	this.insertInActiveDIV =insertInActiveDIV;
	
	var spot =  spot_folder.add( {insertFunction:  insertInActiveDIV}, 'insertFunction' ).name( light.auto_label );

	//Not inserted
	var active_gui = new dat.GUI( { autoPlace: false } );
	var folder = active_gui.addFolder( light.auto_label );
	folder.open();

	function removeSelf()
	{
		spot_folder.remove( spot );
		active_gui.domElement.innerHTML = '';
		updateDisplay( gui );
	}
	this.removeSelf = removeSelf;

	function showHelper()
	{
		if ( spotLightHelper !== null ) return;
		spotLightHelper = new THREE.SpotLightHelper( light );
		siteApp.scene.add( spotLightHelper );
		siteApp.render();
	}

	function hideHelper()
	{
		if ( spotLightHelper === null ) return;
		siteApp.scene.remove( spotLightHelper );
		siteApp.render();
		spotLightHelper = null;
	}
	this.hideHelper = hideHelper;

	function resetHelper()
	{
		if( spotLightHelper !== null )
		{
			hideHelper();
			showHelper();
		}
	}

	function updateHelper()
	{
		if( spotLightHelper !== null )
		{
			spotLightHelper.update();
		}
	}

	function insertHelper()
	{
		var helperVals = {start: true};	
		var helper_gui = folder.add( helperVals, "start" ).onChange(
																		function( value )
																		{
																			if ( value )
																			{
																				showHelper();
																			}
																			else
																			{
																				hideHelper();
																			}
																		}
			 														);	
		helper_gui.name( "Helper" );
	}

	function insertPosition( mesh, name )
	{
		var start_x = mesh.position.x;
		var start_y = mesh.position.y;
		var start_z = mesh.position.z;

		var parameters = {x: start_x, y: start_y, z: start_z, reset: function() { reset() } };
		vals[ name ] = parameters;

		function reset()
		{
			mesh.position.x = start_x;
			mesh.position.y = start_y;
			mesh.position.z = start_z;

			parameters.x = start_x;
			parameters.y = start_y;
			parameters.z = start_z;

			updateHelper();
			updateDisplay( gui );
			updateDisplay( active_gui );
			siteApp.lookAt( mesh.position );
			siteApp.render();
		}

		var folderPosition = folder.addFolder( name );
		
		var positionX = folderPosition.add( parameters, 'x' ).min( editorGUI.x_min ).max( editorGUI.x_max).step( 10 );
		var positionY = folderPosition.add( parameters, 'y' ).min( editorGUI.x_min ).max( editorGUI.x_max).step( 10 );
		var positionZ = folderPosition.add( parameters, 'z' ).min( editorGUI.x_min ).max( editorGUI.x_max).step( 10 );

		positionX.onChange	( function( value ) {   
												mesh.position.x = value; 
												siteApp.look( mesh.position ); 
												updateHelper(); 
											}
							);

		positionY.onChange	( function( value ) {  
												mesh.position.y = value; 
												siteApp.look( mesh.position );
												updateHelper();  
											}
							);

		positionZ.onChange	( function( value )	{   
													mesh.position.z = value; 
													siteApp.look( mesh.position );
													updateHelper();  
												}
							);

		var resetTitle = "To " + start_x.toString() + ", " + start_y.toString() + ", " + start_z.toString();
		folderPosition.add( parameters, 'reset' ).name(resetTitle );
	}

	/*
		hex — Numeric value of the RGB component of the color. 
		intensity — Numeric value of the light's strength/intensity. 
		distance -- Maximum distance from origin where light will shine whose intensity is attenuated 
			linearly based on distance from origin. 
		angle -- Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.
		exponent -- Rapidity of the falloff of light from its target direction.
		decay -- The amount the light dims along the distance of the light.
	*/

	insertHelper();
	insertPosition( light, 'Position' );
	insertPosition( target, 'Target' );

	//color
	var start_color = "#" + light.color.getHexString ();
	var light_color = { color: start_color, currentColor: start_color };
	vals.light_color = light_color;

	var light_color_gui = folder.addColor( light_color, "currentColor" );
	light_color_gui.onChange(
								function( value )
								{
									if ( typeof value === "string" ) 
									{
										value = value.replace( '#', '0x' );
									}
									light_color.currentColor = value;
									light.color.setHex( value );
									siteApp.render();
								}
							);

	// intensity
	var start_intensity = light.intensity;
	var intensityVals = {start: start_intensity, current: start_intensity};
	vals.intensity = intensityVals;

	var light_intensity_gui = folder.add( intensityVals, "current" ).min( 0 ).max( 20 ).step( 0.1 );
	light_intensity_gui.onChange(
									function( value )
									{
										intensityVals.current = value;
										light.intensity = value;
										siteApp.render();
									}
								);

	light_intensity_gui.name( 'Intensity' );

	//distance
	var start_distance = light.distance;
	var distanceVals = {start: start_distance, current: start_distance};
	vals.distance = distanceVals;

	var light_distance_gui = folder.add( distanceVals, "current" ).min( 0 ).max( 2000 ).step( 50 );
	light_distance_gui.onChange(
																		function( value )
																		{
																			distanceVals.current = value;
																			light.distance = value;
																			updateHelper();
																			siteApp.render();
																		}
			 														);
	light_distance_gui.name( 'Distance' );

	//angle
	var start_angle = light.angle;
	var angleVals = {start: start_angle, current: start_angle};
	vals.angle = angleVals;
	var light_angle_gui = folder.add( angleVals, "current" ).min( 0 ).max( Math.PI/2).step( 0.001 )
	light_angle_gui.onChange(
																		function( value )
																		{
																			angleVals.current = value;
																			light.angle = value;
																			updateHelper();
																			siteApp.render();
																		}
			 														);
	light_angle_gui.name( 'Angle' );

	//exponent
	var start_exponent = light.exponent;
	var exponentVals = {start: start_exponent, current: start_exponent};
	vals.exponent = exponentVals;
	var light_exponent_gui = folder.add( exponentVals, "current" ).min( 0 ).max(30 ).step( 0.1 );
	light_exponent_gui.onChange(
																		function( value )
																		{
																			exponentVals.current = value;
																			light.exponent = value;
																			updateHelper();
																			siteApp.render();
																		}
			 														);
	light_exponent_gui.name( 'Exponent' );

	//decay
	var start_decay = light.decay;
	var decayVals = {start: start_decay, current: start_decay};
	vals.decay = decayVals;
	var light_decay_gui = folder.add( decayVals, "current" ).min( 0 ).max(30 ).step( 0.1 );
	light_decay_gui.onChange(
																		function( value )
																		{
																			decayVals.current = value;
																			light.decay = value;
																			updateHelper();
																			siteApp.render();
																		}
			 														);
	light_decay_gui.name( 'Decay' );

	function reset()
	{
		var value = light_color.color;
		if ( typeof value === "string" ) 
		{
			value = value.replace( '#', '0x' );
		}

		light.color.setHex( value );
		light_color.currentColor = light_color.color;

		light.intensity = intensityVals.start;
		intensityVals.current = intensityVals.start;

		light.distance = distanceVals.start;
		distanceVals.current = distanceVals.start;

		light.angle = angleVals.start;
		angleVals.current = angleVals.start;

		light.exponent = exponentVals.start;
		exponentVals.current = exponentVals.start;

		light.decay = decayVals.start;
		decayVals.current = decayVals.start;

		updateDisplay( gui );
		updateDisplay( active_gui );
		resetHelper();
		//siteApp.lookAtReset();
		siteApp.render();
	}
	folder.add( {reset: reset}, 'reset' ).name( "Reset" );

	function selectLight()
	{
		siteApp.lookAt( light.position );
	}
	folder.add( {selectLight: selectLight}, 'selectLight' ).name( "Select light" );

	function selectTarget()
	{
		siteApp.lookAt( target.position );
	}
	folder.add( {selectTarget: selectTarget}, 'selectTarget' ).name( "Select Target" );

	function selectCenter()
	{
		siteApp.lookAtReset();
	}
	folder.add( {selectCenter: selectCenter }, 'selectCenter' ).name( "Select center" );
};

var PointLight = function( editorGUI, gui, point_folder, index, light )
{
	var vals = {};
	this.vals = vals;
	this.light = light;

	var helperVals = {start: true};	

	var pointLightHelper = null;

	function showHelper()
	{
		if ( pointLightHelper !== null ) return;
		var geometry = new THREE.SphereGeometry( 5, 32, 32 );
		var material = new THREE.MeshBasicMaterial( {color: light.color } );
		pointLightHelper = new THREE.Mesh( geometry, material );
		light.add( pointLightHelper );
		siteApp.render();
		helperVals.start = true;
		updateDisplay( gui );
		updateDisplay( active_gui );
	}
	this.showHelper = showHelper;

	function hideHelper()
	{
		if ( pointLightHelper === null ) return;
		light.remove( pointLightHelper );
		siteApp.render();
		spotLightHelper = null;
		helperVals.start = false;
		updateDisplay( gui );
		pointLightHelper = null;
	}
	this.hideHelper = hideHelper;

	function onClose()
	{
		editorGUI.siteApp.lookAtReset();
		hideHelper();
	}

	function insertInActiveDIV()
	{
		editorGUI.insertActiveControl( active_gui.domElement, onClose );
		editorGUI.siteApp.lookAt( light.position );
		showHelper();
	}
	this.insertInActiveDIV = insertInActiveDIV;

	var point =  point_folder.add( {insertFunction:  insertInActiveDIV}, 'insertFunction' ).name( light.auto_label );

	//Not inserted
	var active_gui = new dat.GUI( { autoPlace: false } );
	var folder = active_gui.addFolder( light.auto_label );
	folder.open();

	function removeSelf()
	{
		point_folder.remove( point );
		active_gui.domElement.innerHTML = '';
		updateDisplay( gui );
	}
	this.removeSelf = removeSelf;
	
	function updateHelper( value )
	{
		if ( pointLightHelper !== null )
		{
			pointLightHelper.material.color.setHex( value );
		}
	}

	function insertHelper()
	{
		
		var helper_gui = folder.add( helperVals, "start" ).onChange(
																		function( value )
																		{
																			if ( value )
																			{
																				showHelper();
																			}
																			else
																			{
																				hideHelper();
																			}
																		}
			 														);
		helper_gui.name( "Helper" );
	}

	function insertPosition( mesh, name )
	{
		var start_x = mesh.position.x;
		var start_y = mesh.position.y;
		var start_z = mesh.position.z;

		var parameters = {x: start_x, y: start_y, z: start_z, reset: function() { reset() } };
		vals[ name ] = parameters;

		function reset()
		{
			mesh.position.x = start_x;
			mesh.position.y = start_y;
			mesh.position.z = start_z;

			parameters.x = start_x;
			parameters.y = start_y;
			parameters.z = start_z;

			updateDisplay( gui );
			updateDisplay( active_gui );
			//siteApp.lookAtReset();
			siteApp.render();
		}

		var folderPosition = folder.addFolder( name );
		
		var positionX = folderPosition.add( parameters, 'x' ).min( editorGUI.x_min ).max( editorGUI.x_max).step( 10 );
		var positionY = folderPosition.add( parameters, 'y' ).min( editorGUI.x_min ).max( editorGUI.x_max).step( 10 );
		var positionZ = folderPosition.add( parameters, 'z' ).min( editorGUI.x_min ).max( editorGUI.x_max).step( 10 );

		positionX.onChange( function( value )	{   mesh.position.x = value; siteApp.look( mesh.position ); } );
		positionY.onChange( function( value ) {  mesh.position.y = value; siteApp.look( mesh.position );  } );
		positionZ.onChange( function( value ) {   mesh.position.z = value; siteApp.look( mesh.position ); } );

		var resetTitle = "To " + start_x.toString() + ", " + start_y.toString() + ", " + start_z.toString();
		folderPosition.add( parameters, 'reset' ).name(resetTitle );
	}

	insertHelper();
	insertPosition( light, "Position" );

	/*
		PointLight(hex, intensity, distance, decay)

		hex — Numeric value of the RGB component of the color. 
		intensity — Numeric value of the light's strength/intensity. 
		distance -- The distance of the light where the intensity is 0. When distance is 0, then the distance is endless. 
		decay -- The amount the light dims along the distance of the light.
	*/

	//color
	var start_color = "#" + light.color.getHexString ();
	var light_color = { color: start_color, currentColor: start_color };
	vals.light_color = light_color;
	var light_color_gui = folder.addColor( light_color, "currentColor" );
	light_color_gui.onChange(
								function( value )
								{
									if ( typeof value === "string" ) 
									{
										value = value.replace( '#', '0x' );
									}
									light_color.currentColor = value;
									updateHelper( value );
									light.color.setHex( value );
									siteApp.render();
								}
							);
	//intensity
	var intensityStart = light.intensity;
	var intensityVals = {start: intensityStart, current: intensityStart};
	vals.intensity = intensityVals;

	var light_intensity_gui = folder.add( intensityVals, "current" ).min( 0 ).max( 20 ).step( 0.1 );
	light_intensity_gui.onChange(
									function( value )
									{
										intensityVals.current = value;
										light.intensity = value;
										siteApp.render();
									}
								);
	light_intensity_gui.name( 'Intensity' );

	//distance
	var distanceStart = light.distance;
	var distanceVals = {start: distanceStart, current: distanceStart};
	vals.distance = distanceVals;

	var light_distance_gui = folder.add( distanceVals, "current" ).min( 0 ).max( 2000 ).step( 50 );
	light_distance_gui.onChange(
									function( value )
									{
										distanceVals.current = value;
										light.distance = value;
										siteApp.render();
									}
								);
	light_distance_gui.name( 'Distance' );

	//decay
	var decayStart = light.decay;
	var decayVals = {start: decayStart, current: decayStart};
	vals.decay = decayVals;

	var light_decay_gui = folder.add( decayVals, "current" ).min( 0 ).max(30 ).step( 0.1 );
	light_decay_gui.onChange(
								function( value )
								{
									decayVals.current = value;
									light.decay = value;
									siteApp.render();
								}
							);
	light_decay_gui.name( 'Decay' );
	function reset()
	{
		var value = light_color.color;
		if ( typeof value === "string" ) 
		{
			value = value.replace( '#', '0x' );
		}

		light.color.setHex( value );
		light_color.currentColor = light_color.color;

		light.intensity = intensityVals.start;
		intensityVals.current = intensityVals.start;

		light.distance = distanceVals.start;
		distanceVals.current = distanceVals.start;

		light.decay = decayVals.start;
		decayVals.current = decayVals.start;

		updateHelper( value );
		updateDisplay( gui );
		updateDisplay( active_gui );
		siteApp.render();
	}
	var resetVal = {reset: reset};
	folder.add( resetVal, 'reset' ).name( "Reset" );

};

var LightsGUI = function( editorGUI, gui, active_div)
{
	var vals = {};
	this.vals = vals;
	var lightsGUI = this;

	var siteApp = editorGUI.siteApp;
	this.editorGUI = editorGUI;

	var fog = siteApp.scene.fog;

	var topFolder = gui.addFolder( "Lights" );
	topFolder.open();

	var ambient_folder =  topFolder.addFolder( "Ambient" );
	//ambient_folder.open();

	var fog_folder =  topFolder.addFolder( "Fog" );	
	//fog_folder.open();

	var spot_folder =  topFolder.addFolder( "Spot lights" );
	//spot_folder.open();

	var point_folder =  topFolder.addFolder( "Point lights" );
	//point_folder.open();

	var spotArray = [];
	this.spotArray = spotArray;
	var pointArray = [];
	this.pointArray = pointArray;

	function setAmbientLight()
	{
		var ambientLight = siteApp.lights.ambientLight;
		var start = "#" + ambientLight.color.getHexString ();

		var a_color = { color: start, currentColor: start};
		//public
		vals.ambientLightVals = a_color;

		var ambient_color = ambient_folder.addColor( a_color, "currentColor" );
		ambient_color.onChange(
									function( value )
									{
										if ( typeof value === "string" ) 
										{
											value = value.replace( '#', '0x' );
										}
										a_color.currentColor = value;
										ambientLight.color.setHex( value );
										siteApp.render();
									}
								);

		ambient_color.name( 'Ambient' );

		//bg_color
		//renderer.setClearColor( 0xffffff, 0 ); // second param is opacity, 0 => transparent
		var start = "#000000";
		var color_bg = { color: start, currentColor: start};
		vals.color_bg = color_bg;
		var bg_color = ambient_folder.addColor( color_bg, "currentColor" );
		bg_color.onChange	(
								function( value )
								{
									if ( typeof value === "string" ) 
									{
										value = value.replace( '#', '0x' );
									}
									color_bg.currentColor = value;
									siteApp.rendererGL.setClearColor( parseInt( value, 16), 1 );
									siteApp.render();
								}
							);

		bg_color.name( 'Background' );

		function reset()
		{
			a_color.currentColor = a_color.color;
			var value = a_color.color.replace( '#', '0x' );
			ambientLight.color.setHex( value );

			color_bg.currentColor = color_bg.color;
			var value = color_bg.color.replace( '#', '0x' );
			siteApp.rendererGL.setClearColor( parseInt( value, 16), 1 );

			updateDisplay( gui );
			siteApp.render();
		}
		var resetVal = {reset: reset};
		ambient_folder.add( resetVal, 'reset' ).name( "Reset" );
	}

	function setFog()
	{
		var start = "#" + fog.color.getHexString ();
		var fog_color = { color: start, currentColor: start};
		vals.fogVals = fog_color;
		var fog_color_gui = fog_folder.addColor( fog_color, "currentColor" );
		fog_color_gui.onChange (
									function( value )
									{
										if ( typeof value === "string" ) 
										{
											value = value.replace( '#', '0x' );
										}
										fog_color.currentColor = value;
										fog.color.setHex( value );
										siteApp.render();
									}
								);

		fog_color_gui.name( 'Color' );

		var start = 0.00025;
		var startDensity = {density: 0.00025};
		vals.fogDencity = startDensity;
		var density_gui = fog_folder.add( startDensity, "density" ).min( 0.000025 ).max( 0.0025 );
		density_gui.onChange(
								function( value )
								{
									startDensity.density = value;
									fog.density = value;
									siteApp.render();
								}
							);
		density_gui.name( 'Density' );

		function reset()
		{
			fog_color.currentColor = fog_color.color;
			var value = fog_color.color.replace( '#', '0x' );
			fog.color.setHex( value );
			
			startDensity.density = start;
			fog.density = start;

			updateDisplay( gui );
			siteApp.render();
		}
		var resetVal = {reset: reset};
		fog_folder.add( resetVal, 'reset' ).name( "Reset" );
	}

	function insertSpotLight( spotLight, target )
	{
		var i = spotArray.length;
		var spotLight_ = new SpotLight( editorGUI, gui, spot_folder, i, spotLight, target );
		spotArray.push( spotLight_ );
		spotLight_.insertInActiveDIV();
	}
	this.insertSpotLight = insertSpotLight;

	function removeSpotLight( spotlight )
	{
		for( var i = ( spotArray.length - 1 ); i > -1; i-- )
		{
			var spot = spotArray[i];
			if ( spot.light.auto_label == spotlight.auto_label )
			{
				spot.removeSelf();
				spotArray.splice( i, 1 );
			}
		}
	}
	this.removeSpotLight = removeSpotLight;

	function setSpotLight()
	{
		var spotLights = siteApp.lights.spotLights;
		var targets = siteApp.lights.targets;

		for ( var i = 0; i < spotLights.length; i++ )
		{
			var spotLight = spotLights[i];
			var target = targets[i];
			var spotLight_ = new SpotLight( editorGUI, gui, spot_folder, i, spotLight, target );
			spotArray.push( spotLight_ );
		}
	}

	function insertPointLight( pointLight )
	{
		var i = pointArray.length;
		var pointLight_ = new PointLight( editorGUI, gui, point_folder, i, pointLight );
		pointArray.push( pointLight_ );
		pointLight_.insertInActiveDIV();
	}
	this.insertPointLight = insertPointLight;

	function removePointLight( pointlight )
	{
		for( var i = ( pointArray.length - 1 ); i > -1; i-- )
		{
			var point = pointArray[i];
			if ( point.light.auto_label == pointlight.auto_label )
			{
				point.removeSelf();
				pointArray.splice( i, 1 );
			}
		}
	}
	this.removePointLight = removePointLight;

	function setPointLight()
	{
		var pointLights = siteApp.lights.pointLights;
		for ( var i = 0; i < pointLights.length; i++ )
		{
			var pointLight = pointLights[i];
			var pointLight_ = new PointLight( editorGUI, gui, point_folder, i, pointLight );
			pointArray.push( pointLight_ );
		}	
	}

	function free()
	{
		editorGUI.right_top_div.removeChild( gui.domElement );
		// for ( var i = 0; i < spotArray.length; i++ )
		// {
		// 	spotArray[i].hideHelper();
		// }
		// for ( var i = 0; i < pointArray.length; i++ )
		// {
		// 	pointArray[i].hideHelper();
		// }
	}
	this.free = free;

	function openAgain()
	{
		editorGUI.right_top_div.appendChild( gui.domElement );
	}
	this.openAgain = openAgain;
	

	setAmbientLight();
	setFog();
	setSpotLight();
	setPointLight();

	var build = {click: jsBuild};
	var js_folder =  topFolder.add(build, "click" ).name( "Create lights.js" );

	function jsBuild() 
	{ 
		var lightJSBuilder = new LightJSBuilder( editorGUI, lightsGUI );	
	}
}