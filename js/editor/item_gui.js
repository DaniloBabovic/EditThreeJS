var CylinderGUI = function( item_3d_gui )
{
	
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

	var parameters = item_3d_gui.mesh.parameters;

	var start_radiusTop = parameters.width;
	var start_radiusBottom = parameters.radiusBottom;
	var start_height = parameters.height;

	var start_radiusSegments = parameters.radiusSegments;
	var start_heightSegments = parameters.heightSegments;
	var start_openEnded = parameters.openEnded;

	var start_thetaStart = parameters.thetaStart;
	var start_thetaLength = parameters.thetaLength;


	var topFolder = item_3d_gui.topFolder.addFolder( "Cylinder Geometry" );
	
	function reset()
	{
		try 
		{
			
			parameters.radiusTop = start_radiusTop;
			parameters.radiusBottom = start_radiusBottom;
			parameters.height = start_height;

			parameters.radiusSegments = start_radiusSegments;
			parameters.heightSegments = start_heightSegments;
			parameters.openEnded = start_openEnded;

			parameters.thetaStart = start_thetaStart;
			parameters.thetaLength = start_thetaLength;

			update();
			updateDisplay( item_3d_gui.gui );
		}
		catch( err ) 
		{
			var message = "Error, please click reset button again. Err message: \n" + err.message;
    		alert( message );
		}	
	}

	parameters[ "reset" ] = reset;

	function update()
	{
		try 
		{
    		item_3d_gui.mesh.geometry.dispose();
			var geometry = new THREE.CylinderGeometry	( 
															parameters.radiusTop,
															parameters.radiusBottom,
															parameters.height,

															parameters.radiusSegments,
															parameters.heightSegments,
															parameters.openEnded,

															parameters.thetaStart,
															parameters.thetaLength
														);
			geometry.center();
			item_3d_gui.mesh.geometry = geometry;
			siteApp.render();
		}
		catch( err ) 
		{
			var message = "Error, please click reset button. Err message: \n" + err.message;
    		alert( message );
		}
	}

	var radiusTop = topFolder.add( parameters, 'radiusTop' ).min( 1 ).max( 500 ).step( 1 );
	var radiusBottom = topFolder.add( parameters, 'radiusBottom' ).min( 1 ).max( 500 ).step( 1 );
	var height = topFolder.add( parameters, 'height' ).min( 1 ).max( 500 ).step( 1 );

	var radiusSegments = topFolder.add( parameters, 'radiusSegments' ).min( 1 ).max( 200 ).step( 1 );
	var heightSegments = topFolder.add( parameters, 'heightSegments' ).min( 1 ).max( 200 ).step( 1 );
	var openEnded = topFolder.add( parameters, 'openEnded' );

	var thetaStart = topFolder.add( parameters, 'thetaStart' ).min( -2 * Math.PI ).max(  2 * Math.PI  ).step( 0.01 );
	var thetaLength = topFolder.add( parameters, 'thetaLength' ).min(  -2 * Math.PI  ).max( 2 * Math.PI ).step( 0.01 );

	radiusTop.onChange( function( value ) { parameters.radiusTop = value; update( "radiusTop" ); } );
	radiusBottom.onChange( function( value ) { parameters.radiusBottom = value; update( "radiusBottom" ); } );
	height.onChange( function( value ) { parameters.height = value; update( "height" ); } );

	radiusSegments.onChange( function( value ) { parameters.radiusSegments = Math.round(value); update( "radiusSegments" ); } );
	heightSegments.onChange( function( value ) { parameters.heightSegments = Math.round(value); update( "heightSegments" ); } );
	openEnded.onChange( function( value ) { parameters.openEnded = value; update( "openEnded" ); } );

	thetaStart.onChange( function( value ) { parameters.thetaStart = value; update( "thetaStart" ); } );
	thetaLength.onChange( function( value ) { parameters.thetaLength = value; update( "thetaLength" ); } );
	
	topFolder.add( parameters, 'reset' ).name( 'reset' );
};

var PlainGUI = function( item_3d_gui )
{
	/*
		width — Width along the X axis.
		height — Height along the Y axis.
		widthSegments — Optional. Default is 1. 
		heightSegments — Optional. Default is 1.
	*/

	var parameters = item_3d_gui.mesh.parameters;

	var start_width = parameters.width;
	var start_height = parameters.height;

	var start_widthSegments = parameters.widthSegments;
	var start_heightSegments = parameters.heightSegments;

	var topFolder = item_3d_gui.topFolder.addFolder( "Plane Geometry" );
	
	function reset()
	{
		try 
		{
			parameters.width = start_width;
			parameters.height = start_height;

			parameters.widthSegments = start_widthSegments;
			parameters.heightSegments = start_heightSegments;
			
			update();
			updateDisplay( item_3d_gui.gui );
		}
		catch( err ) 
		{
			var message = "Error, please click reset button again. Err message: \n" + err.message;
    		alert( message );
		}	
	}

	parameters[ "reset" ] = reset;

	function update()
	{
		try 
		{
    		item_3d_gui.mesh.geometry.dispose();
			var geometry = new THREE.PlaneGeometry( 
													parameters.width, parameters.height,
													
													parameters.widthSegments, 
													parameters.heightSegments
												);
			geometry.center();
			item_3d_gui.mesh.geometry = geometry;
			siteApp.render();
		}
		catch( err ) 
		{
			var message = "Error, please click reset button. Err message: \n" + err.message;
    		alert( message );
		}
	}

	var width = topFolder.add( parameters, 'width' ).min( 1 ).max( 1000 ).step( 1 );
	var height = topFolder.add( parameters, 'height' ).min( 1 ).max( 1000 ).step( 1 );

	var widthSegments = topFolder.add( parameters, 'widthSegments' ).min( 1 ).max( 200 ).step( 1 );
	var heightSegments = topFolder.add( parameters, 'heightSegments' ).min( 1 ).max( 200 ).step( 1 );

	width.onChange( function( value ) { parameters.text = value; update( "width" ); } );
	height.onChange( function( value ) { parameters.text = value; update( "height" ); } );
	

	widthSegments.onChange( function( value ) { parameters.text = value; update( "widthSegments" ); } );
	heightSegments.onChange( function( value ) { parameters.text = value; update( "heightSegments" ); } );
	
	
	topFolder.add( parameters, 'reset' ).name( 'reset' );
};

var BoxGUI = function( item_3d_gui )
{
	/*
		width — Width of the sides on the X axis.
		height — Height of the sides on the Y axis.
		depth — Depth of the sides on the Z axis.

		widthSegments — Optional. Number of segmented faces along the width of the sides. Default is 1.
		heightSegments — Optional. Number of segmented faces along the height of the sides. Default is 1.
		depthSegments — Optional. Number of segmented faces along the depth of the sides. Default is 1.
	*/

	var parameters = item_3d_gui.mesh.parameters;

	var start_width = parameters.width;
	var start_height = parameters.height;
	var start_depth = parameters.depth;

	var start_widthSegments = parameters.widthSegments;
	var start_heightSegments = parameters.heightSegments;
	var start_depthSegments = parameters.depthSegments;

	var topFolder = item_3d_gui.topFolder.addFolder( "Box Geometry" );
	
	function reset()
	{
		try 
		{
			parameters.width = start_width;
			parameters.height = start_height;
			parameters.depth = start_depth;

			parameters.widthSegments = start_widthSegments;
			parameters.heightSegments = start_heightSegments;
			parameters.depthSegments = start_depthSegments;
			
			update();
			updateDisplay( item_3d_gui.gui );
		}
		catch( err ) 
		{
			var message = "Error, please click reset button. Err message: " + err.message;
    		alert( message );
		}	
	}

	parameters[ "reset" ] = reset;

	function update()
	{
		try 
		{
    		item_3d_gui.mesh.geometry.dispose();
			var geometry = new THREE.BoxGeometry( 
													parameters.width, parameters.height, parameters.depth, 
													
													parameters.widthSegments, 
													parameters.heightSegments, 
													parameters.depthSegments 
												);
			geometry.center();
			item_3d_gui.mesh.geometry = geometry;
			siteApp.render();
		}
		catch( err ) 
		{
			var message = "Error, please click reset button. Err message: \n" + err.message;
    		alert( message );
		}
	}

	var width  = topFolder.add( parameters, 'width' ).min( 1 ).max( 500 ).step( 1 );
	var height = topFolder.add( parameters, 'height' ).min( 1 ).max( 500 ).step( 1 );
	var depth  = topFolder.add( parameters, 'depth' ).min( 1 ).max( 500 ).step( 1 );

	var widthSegments 	= topFolder.add( parameters, 'widthSegments' ).min( 1 ).max( 42 ).step( 1 );
	var heightSegments = topFolder.add( parameters, 'heightSegments' ).min( 1 ).max( 42 ).step( 1 );
	var depthSegments 	= topFolder.add( parameters, 'depthSegments' ).min( 1 ).max( 42 ).step( 1 );

	width.onChange	( function( value ) { parameters.text = value; update( "width" ); } );
	height.onChange	( function( value ) { parameters.text = value; update( "height" ); } );
	depth.onChange	( function( value ) { parameters.text = value; update( "depth" ); } );

	widthSegments.onChange	( function( value ) { parameters.text = value; update( "widthSegments" ); } );
	heightSegments.onChange	( function( value ) { parameters.text = value; update( "heightSegments" ); } );
	depthSegments.onChange	( function( value ) { parameters.text = value; update( "depthSegments" ); } );
	
	topFolder.add( parameters, 'reset' ).name( 'reset' );
};

var SphereCustomGUI = function( item_3d_gui )
{
	/*
		radius — sphere radius. Default is 50.
		widthSegments — number of horizontal segments. Minimum value is 3, and the default is 8.
		heightSegments — number of vertical segments. Minimum value is 2, and the default is 6.
		phiStart — specify horizontal starting angle. Default is 0.
		phiLength — specify horizontal sweep angle size. Default is Math.PI * 2.
		thetaStart — specify vertical starting angle. Default is 0.
		thetaLength — specify vertical sweep angle size. Default is Math.PI.
	*/
	var topFolder = item_3d_gui.topFolder.addFolder( "SphereGeometry" );	

	var wire = item_3d_gui.mesh.children[ 0 ];

	var mesh = item_3d_gui.mesh.children[ 1 ];
	var material = mesh.material;
	var geometry = mesh.geometry;
	var parameters = mesh.geometry.parameters;
	
	var startVals = 
	{
		radius: parameters.radius,
		widthSegments: parameters.widthSegments,
		heightSegments: parameters.heightSegments,
		phiStart: parameters.phiStart,
		phiLength: parameters.phiLength,
		thetaStart: parameters.thetaStart,
		thetaLength: parameters.thetaLength
	}
	
	/*
		folder.add( data, 'radius', 1, 30 ).onChange( generateGeometry );
		folder.add( data, 'widthSegments', 3, 32 ).step( 1 ).onChange( generateGeometry );
		folder.add( data, 'heightSegments', 2, 32 ).step( 1 ).onChange( generateGeometry );
		folder.add( data, 'phiStart', 0, twoPi ).onChange( generateGeometry );
		folder.add( data, 'phiLength', 0, twoPi ).onChange( generateGeometry );
		folder.add( data, 'thetaStart', 0, twoPi ).onChange( generateGeometry );
		folder.add( data, 'thetaLength', 0, twoPi ).onChange( generateGeometry );
	*/

	function reset()
	{
		try 
		{
			parameters.radius = startVals.radius;
			parameters.widthSegments = startVals.widthSegments;
			parameters.heightSegments = startVals.heightSegments;
			parameters.phiStart = startVals.phiStart;
			parameters.phiLength = startVals.phiLength;
			parameters.thetaStart = startVals.thetaStart;
			parameters.thetaLength = startVals.thetaLength;

			update();
			updateDisplay( item_3d_gui.gui );
		}
		catch( err ) 
		{
			var message = "Error, please click reset button. Err message: " + err.message;
    		alert( message );
		}	
	}
	parameters[ "reset" ] = reset;

	var twoPi 			= Math.PI * 2;
	var radius 			= topFolder.add( parameters, 'radius', 1, 100 );
	var widthSegments 	= topFolder.add( parameters, 'widthSegments', 3, 32, 1 );
	var heightSegments 	= topFolder.add( parameters, 'heightSegments', 3, 32, 1 );
	var phiStart 		= topFolder.add( parameters, 'phiStart', 0, twoPi );
	var phiLength 		= topFolder.add( parameters, 'phiLength', 0, twoPi );
	var thetaStart 		= topFolder.add( parameters, 'thetaStart', 0, twoPi );
	var thetaLength 	= topFolder.add( parameters, 'thetaLength', 0, twoPi );

	var wireVisibleStart = wire.material.visible;
	var wireParams = {visible: wireVisibleStart};
	var wireGUI = topFolder.add( wireParams, 'visible' );
	wireGUI.name( 'Show wire' );

	function update()
	{
		//var geometry = new THREE.SphereGeometry( 15, 8, 6, 0, Math.PI * 2, 0, Math.PI * 2);
		var geometry = new THREE.SphereGeometry	( 
													parameters.radius,
													parameters.widthSegments,
													parameters.heightSegments,
													parameters.phiStart,
													parameters.phiLength,
													parameters.thetaStart,
													parameters.thetaLength
												);
		wire.geometry.dispose();
		mesh.geometry.dispose();

		wire.geometry = new THREE.WireframeGeometry( geometry );
		mesh.geometry = geometry;
		siteApp.render();
	}


	radius.onChange			( function( value ) { parameters.radius 			= value; update(); } );
	widthSegments.onChange	( function( value ) { parameters.widthSegments 		= value; update(); } );
	heightSegments.onChange	( function( value ) { parameters.heightSegments 	= value; update(); } );
	phiStart.onChange		( function( value ) { parameters.phiStart 			= value; update(); } );
	phiLength.onChange		( function( value ) { parameters.phiLength 			= value; update(); } );
	thetaStart.onChange		( function( value ) { parameters.thetaStart 		= value; update(); } );
	thetaLength.onChange	( function( value ) { parameters.thetaLength 		= value; update(); } );
	wireGUI.onChange		( function( value ) 
								{  
									wireParams.visible = value; 
									wire.material.visible = value;
									update();  
								}   
							);
	topFolder.add( parameters, 'reset' ).name( "Reset" );
};

var SphereGUI = function( item_3d_gui )
{
	/*
		radius — sphere radius. Default is 50.
		widthSegments — number of horizontal segments. Minimum value is 3, and the default is 8.
		heightSegments — number of vertical segments. Minimum value is 2, and the default is 6.
		phiStart — specify horizontal starting angle. Default is 0.
		phiLength — specify horizontal sweep angle size. Default is Math.PI * 2.
		thetaStart — specify vertical starting angle. Default is 0.
		thetaLength — specify vertical sweep angle size. Default is Math.PI.
	*/
	var topFolder = item_3d_gui.topFolder.addFolder( "SphereGeometry" );	

	var mesh = item_3d_gui.mesh;
	var material = mesh.material;
	var geometry = mesh.geometry;
	var parameters = mesh.geometry.parameters;
	
	var startVals = 
	{
		radius: parameters.radius,
		widthSegments: parameters.widthSegments,
		heightSegments: parameters.heightSegments,
		phiStart: parameters.phiStart,
		phiLength: parameters.phiLength,
		thetaStart: parameters.thetaStart,
		thetaLength: parameters.thetaLength
	}
	
	/*
		folder.add( data, 'radius', 1, 30 ).onChange( generateGeometry );
		folder.add( data, 'widthSegments', 3, 32 ).step( 1 ).onChange( generateGeometry );
		folder.add( data, 'heightSegments', 2, 32 ).step( 1 ).onChange( generateGeometry );
		folder.add( data, 'phiStart', 0, twoPi ).onChange( generateGeometry );
		folder.add( data, 'phiLength', 0, twoPi ).onChange( generateGeometry );
		folder.add( data, 'thetaStart', 0, twoPi ).onChange( generateGeometry );
		folder.add( data, 'thetaLength', 0, twoPi ).onChange( generateGeometry );
	*/


	function reset()
	{
		try 
		{
			parameters.radius 			= startVals.radius;
			parameters.widthSegments 	= startVals.widthSegments;
			parameters.heightSegments 	= startVals.heightSegments;
			parameters.phiStart 		= startVals.phiStart;
			parameters.phiLength 		= startVals.phiLength;
			parameters.thetaStart 		= startVals.thetaStart;
			parameters.thetaLength 		= startVals.thetaLength;

			update();
			updateDisplay( item_3d_gui.gui );
		}
		catch( err ) 
		{
			var message = "Error, please click reset button. Err message: " + err.message;
    		alert( message );
		}	
	}
	parameters[ "reset" ] = reset;

	var twoPi 			= Math.PI * 2;
	var radius			= topFolder.add( parameters, 'radius', 1, 100 );
	var widthSegments 	= topFolder.add( parameters, 'widthSegments', 3, 32, 1 );
	var heightSegments 	= topFolder.add( parameters, 'heightSegments', 3, 32, 1 );
	var phiStart 		= topFolder.add( parameters, 'phiStart', 0, twoPi );
	var phiLength 		= topFolder.add( parameters, 'phiLength', 0, twoPi );
	var thetaStart 		= topFolder.add( parameters, 'thetaStart', 0, twoPi );
	var thetaLength 	= topFolder.add( parameters, 'thetaLength', 0, twoPi );

	function update()
	{
		//var geometry = new THREE.SphereGeometry( 15, 8, 6, 0, Math.PI * 2, 0, Math.PI * 2);
		var geometry = new THREE.SphereGeometry	( 
													parameters.radius,
													parameters.widthSegments,
													parameters.heightSegments,
													parameters.phiStart,
													parameters.phiLength,
													parameters.thetaStart,
													parameters.thetaLength
												);
		mesh.geometry = geometry;
		siteApp.render();
	}

	radius.onChange			( function( value ) { parameters.radius 			= value; update(); } );
	widthSegments.onChange	( function( value ) { parameters.widthSegments 		= value; update(); } );
	heightSegments.onChange	( function( value ) { parameters.heightSegments 	= value; update(); } );
	phiStart.onChange		( function( value ) { parameters.phiStart 			= value; update(); } );
	phiLength.onChange		( function( value ) { parameters.phiLength 			= value; update(); } );
	thetaStart.onChange		( function( value ) { parameters.thetaStart 		= value; update(); } );
	thetaLength.onChange	( function( value ) { parameters.thetaLength 		= value; update(); } );

	topFolder.add( parameters, 'reset' ).name( "Reset" );
};

var Text3DGUI = function( item_3d_gui )
{
	var topFolder = item_3d_gui.topFolder.addFolder( "Text Geometry" );	

	var parameters = item_3d_gui.mesh.parameters;

	/*
		font — THREE.Font.
		size — Float. Size of the text.
		height — Float. Thickness to extrude text. Default is 50.
		curveSegments — Integer. Number of points on the curves. Default is 12.
		bevelEnabled — Boolean. Turn on bevel. Default is False.
		bevelThickness — Float. How deep into text bevel goes. Default is 10.
		bevelSize — Float. How far from text outline is bevel. Default is 8.
	*/
	var start_text = parameters.text;
	var start_size = parameters.size;
	var start_height = parameters.height;
	var start_curveSegments = parameters.curveSegments;
	var start_font = parameters.font;
	var start_weight = parameters.weight;
	var start_bevelEnabled = parameters.bevelEnabled;
	var start_bevelThickness = parameters.bevelThickness;
	var start_bevelSize = parameters.bevelSize;

	function reset()
	{
		try 
		{
			parameters.text = start_text;
			parameters.size = start_size;
			parameters.height = start_height;
			parameters.curveSegments = start_curveSegments;
			parameters.font = start_font;
			parameters.weight = start_weight;
			parameters.bevelEnabled = start_bevelEnabled;
			parameters.bevelThickness = start_bevelThickness;
			parameters.bevelSize = start_bevelSize;

			item_3d_gui.mesh.geometry.dispose();
			var geometry = new THREE.TextGeometry( parameters.text, parameters );
			geometry.center();
			item_3d_gui.mesh.geometry = geometry;
			siteApp.render();
			updateDisplay( item_3d_gui.gui );
		}
		catch( err ) 
		{
			var message = "Error, please click reset button. Err message: " + err.message;
    		alert( message );
		}	
	}

	parameters[ "reset" ] = reset;

	function update(ctrlName )
	{
		try 
		{
    		item_3d_gui.mesh.geometry.dispose();
			var geometry = new THREE.TextGeometry( parameters.text, parameters );
			geometry.center();
			item_3d_gui.mesh.geometry = geometry;
			siteApp.render();
		}
		catch( err ) 
		{
			try
			{
				if (ctrlName == "text" )
				{
					parameters.text = start_text;
					reset();
				} 
				else if (ctrlName == "font" )
				{
					parameters.font = start_font;
					reset();
				}
				else if (ctrlName == "weight" )
				{
					parameters.weight = start_weight;
					reset();
				}
				alert( err.message );
			}
			catch( err ) 
			{
				var message = "Error, please click reset button. Err message: " + err.message;
	    		alert( message );
			}	
		}
	}

	var text 			= topFolder.add( parameters, 'text' );
	var size 			= topFolder.add( parameters, 'size' );
	var height 			= topFolder.add( parameters, 'height' );
	var curveSegments 	= topFolder.add( parameters, 'curveSegments' );
	var weight 			= topFolder.add( parameters, 'weight', [ "bold", "normal" ]  ).name( 'weight' );
	//var font = topFolder.add( parameters, 'font' );
	var font 			= topFolder.add( parameters, 'font', [ "gentilis", "helvetiker", "optimer" ] ).name( 'font' );
	var bevelEnabled 	= topFolder.add( parameters, 'bevelEnabled' );
	var bevelThickness 	= topFolder.add( parameters, 'bevelThickness' );
	var bevelSize 		= topFolder.add( parameters, 'bevelSize' );

	text.onChange			( function( value ) { parameters.text 			= value; update( "text" ); } );
	size.onChange			( function( value ) { parameters.size 			= value; update( "size" ); } );
	height.onChange			( function( value ) { parameters.height 		= value; update( "height" ); } );
	curveSegments.onChange	( function( value ) { parameters.curveSegments 	= value; update( "curveSegments" ); } );
	weight.onChange			( function( value ) { parameters.weight 		= value; update( "weight" ); } );
	font.onChange			( function( value ) { parameters.font 			= value; update( "font" ); } );
	bevelEnabled.onChange	( function( value ) { parameters.bevelEnabled 	= value; update( "bevelEnabled" ); } );
	bevelThickness.onChange	( function( value ) { parameters.bevelThickness = value; update( "bevelThickness" ); } );
	bevelSize.onChange		( function( value ) { parameters.bevelSize 		= value; update( "bevelSize" ); } );
	
	topFolder.add( parameters, 'reset' ).name( "Reset" );
};

var PositionGUI = function( editorGUI, gui, mesh, parentFolder, name, absolutePosition )
{
	var siteApp = editorGUI.siteApp;

	var start_x = mesh.position.x;
	var start_y = mesh.position.y;
	var start_z = mesh.position.z;

	function getPosition()
	{
		if ( isNull( absolutePosition ) == true )
		{
			return mesh.position;
		}
		else
		{
			return absolutePosition();
		}
	}

	var parameters = {x: start_x, y: start_y, z: start_z, reset: function() { reset() } };

	function reset()
	{
		mesh.position.x = start_x;
		mesh.position.y = start_y;
		mesh.position.z = start_z;

		parameters.x = start_x;
		parameters.y = start_y;
		parameters.z = start_z;

		updateDisplay( gui );

		siteApp.look( getPosition() );
	}

	var folderPosition = parentFolder.addFolder( name );
	
	var positionX = folderPosition.add( parameters, 'x' ).min( editorGUI.x_min ).max( editorGUI.x_max ).step( 5 );
	var positionY = folderPosition.add( parameters, 'y' ).min( editorGUI.x_min ).max( editorGUI.x_max ).step( 5 );
	var positionZ = folderPosition.add( parameters, 'z' ).min( editorGUI.x_min ).max( editorGUI.x_max ).step( 5 );

	positionX.onChange( function( value )	{ mesh.position.x = value; siteApp.look( getPosition() ); } );
	positionY.onChange( function( value ) 	{ mesh.position.y = value; siteApp.look( getPosition() ); } );
	positionZ.onChange( function( value )	{ mesh.position.z = value; siteApp.look( getPosition() ); } );

	var resetTitle = "To " + start_x.toString() + ", " + start_y.toString() + ", " + start_z.toString();
	folderPosition.add( parameters, 'reset' ).name(resetTitle );
};

var RotationGui = function( editorGUI, gui, item_3d, topFolder )
{
	var mesh = item_3d.mesh;
	var start_x = mesh.rotation.x;
	var start_y = mesh.rotation.y;
	var start_z = mesh.rotation.z;

	var parameters = {
						rx: toDeg( mesh.rotation.x), 
						ry: toDeg( mesh.rotation.y), 
						rz: toDeg( mesh.rotation.z ),
						reset: function() { reset() }
					};

	function reset()
	{
		mesh.rotation.x = start_x;
		mesh.rotation.y = start_y;
		mesh.rotation.z = start_z;

		parameters.rx = toDeg( start_x);
		parameters.ry = toDeg( start_y);
		parameters.rz = toDeg( start_z );

		updateDisplay( gui );

		siteApp.lookAt( item_3d.absolutePosition() );
	}

	var folderRotation = topFolder.addFolder( 'Rotation' );
	var rotationX = folderRotation.add( parameters, 'rx' ).min( -180 ).max( 180 ).step( 5 );
	var rotationY = folderRotation.add( parameters, 'ry' ).min( -180 ).max( 180 ).step( 5 );
	var rotationZ = folderRotation.add( parameters, 'rz' ).min( -180 ).max( 180 ).step( 5 );
	
	rotationX.onChange( function( value ) { mesh.rotation.x = toRad( value ); siteApp.render(); } );
	rotationY.onChange( function( value ) { mesh.rotation.y = toRad( value ); siteApp.render(); } );
	rotationZ.onChange( function( value ) { mesh.rotation.z = toRad( value ); siteApp.render(); } );

	var resetTitle = "To " + toDeg( start_x) + ", " + toDeg( start_y) + ", " + toDeg( start_z );
	folderRotation.add( parameters, 'reset' ).name(resetTitle );
};

var ScaleGui = function( editorGUI, gui, item_3d, topFolder )
{
	var mesh = item_3d.mesh;
	var start_x = mesh.scale.x;
	var start_y = mesh.scale.y;
	var start_z = mesh.scale.z;
	var prop = {proportional: true};
	
	var parameters = {
						sx: mesh.scale.x, 
						sy: mesh.scale.y, 
						sz: mesh.scale.z,
						reset: function() { reset() }
					};

	function reset()
	{
		parameters.sx = start_x;
		parameters.sy = start_y;
		parameters.sz = start_z;

		mesh.scale.x = parameters.sx;
		mesh.scale.y = parameters.sy;
		mesh.scale.z = parameters.sz;
		
		updateDisplay( gui );
		siteApp.render();
	}

	var folderScale = topFolder.addFolder( 'Scale' );
	var prop = {proportional: true};
	var proportional_boolean = folderScale.add( prop, 'proportional' ).name( 'proportional' );

	var scaleX = folderScale.add( parameters, 'sx' ).min( 0.1 ).max( 5 ).step( 0.05 );
	var scaleY = folderScale.add( parameters, 'sy' ).min( 0.1 ).max( 5 ).step( 0.05 );
	var scaleZ = folderScale.add( parameters, 'sz' ).min( 0.1 ).max( 5 ).step( 0.05 );
	
	function change( oldValue, value )
	{
		var diff = value/oldValue;

		parameters.sx = mesh.scale.x * diff;
		mesh.scale.x = parameters.sx;

		parameters.sy = mesh.scale.y * diff;
		mesh.scale.y = parameters.sy;

		parameters.sz = mesh.scale.z * diff;
		mesh.scale.z = parameters.sz;

		siteApp.render();
	}
	scaleX.onChange(	function( value )	
						{  
							if ( prop.proportional == true )
								change( mesh.scale.x, value ); 	
							else
							{
								mesh.scale.x = value; 
								siteApp.render();									
							}
							updateDisplay( gui );
						} 
					);

	scaleY.onChange(	function( value )	
						{  
							if ( prop.proportional == true )
								change( mesh.scale.y, value ); 	
							else
							{
								mesh.scale.y = value; 
								siteApp.render();									
							}
							updateDisplay( gui );
						} 
					);

	scaleZ.onChange(	function( value )	
						{  
							if ( prop.proportional == true )
								change( mesh.scale.z, value ); 	
							else
							{
								mesh.scale.z = value; 
								siteApp.render();									
							}
							updateDisplay( gui );
						} 
					);

	var resetTitle = "To " + start_x + ", " + start_y + ", " + start_z;
	folderScale.add( parameters, 'reset' ).name(resetTitle );
};

var GroupGUI = function( editorGUI, gui, item_3d, topFolder )
{
	var groupFolder;

	var childs = [];
	
	var oldGroup = null;
	var oldGroupIsScene = false;
	
	var newGroup = null;
	var newGroupIsScene = false;

	var buttonOpenGroup;

	function changeGroup(yesNo )
	{
		if (yesNo == 0 ) return;
		for ( var i = childs.length - 1; i >= 0; i-- ) 
		{
			groupFolder.remove(childs[i]);
		};
		groupFolder.remove(buttonOpenGroup );
		childs = [];
			
		if ( oldGroupIsScene )
		{
			if ( item_3d.group == null )
			{
				editorGUI.siteApp.scene.remove( item_3d.mesh );
			}
			else
			{
				editorGUI.siteApp.scene.remove( item_3d.group );	
			}
		}
		else
		{
			if ( item_3d.group == null )
			{
				oldGroup.remove( item_3d.mesh );
			}
			else
			{
				oldGroup.remove( item_3d.group );
			}
		}

		if ( newGroupIsScene )
		{
			if ( item_3d.group == null )
			{
				editorGUI.siteApp.scene.add( item_3d.mesh );
			}
			else
			{
				editorGUI.siteApp.scene.add( item_3d.group );
			}
			item_3d.parentGroup = null;
		}
		else
		{
			if ( item_3d.group == null )
			{
				newGroup.add( item_3d.mesh );	
			}
			else
			{
				newGroup.add( item_3d.group );	
			}
			item_3d.parentGroup = newGroup;
		}
		insert();
		editorGUI.siteApp.render();
		editorGUI.leftMenu.leftMenuSelect.refresh();
	}

	function getName( group )
	{
		if ( group.type == 'Scene' ) return 'Scene';
		return group.parameters.auto_label;
	}

	function confirmNewGroup( selectedGroup )
	{
		newGroup = selectedGroup;
		if ( newGroup.type == 'Scene' ) 
			newGroupIsScene = true;
		else
			newGroupIsScene = false;

		var text = 'Do you want to change group\n';
		text += 'from: ' + getName( oldGroup ) + '\n';
		text += 'to: ' + getName( newGroup ) + '\n';

		new DialogYesNo( text, "Change group", changeGroup );	
	}

	groupFolder = topFolder.addFolder( "Group" );
	function insert()
	{
		function insertScene()
		{
			var isSelected = false;
			if ( item_3d.parentGroup == null )
			{
				isSelected = true;
				oldGroup = editorGUI.siteApp.scene;
				oldGroupIsScene = true;
			}
			var selected = {selected: isSelected};
			if ( isSelected == true )
			{
				function open()
				{
					new Dialog( "Scene is root group.", "Scene is parent" );
				}
				buttonOpenGroup = groupFolder.add( { open: open }, "open" ).name( "Scene is parent" );
			}
			else
			{
				var groupChecked = groupFolder.add( selected, "selected" ).name( 'Scene' );
				childs.push( groupChecked);
				groupChecked.onChange(   
										function( value ) 
										{  
											if ( value == false )
											{
												selected.selected = true;
												var text = "You can't deselect group.\n";
												text += "You can select new one, then, this group will be deselected.";
												new Dialog( text, "Info" );
											}
											else
											{
												selected.selected = false;
												confirmNewGroup( editorGUI.siteApp.scene );
											}
										}   
									);
			}
		}

		function insertGroup( group )
		{
			var isSelected = false;
			if ( item_3d.parentGroup !== null )
			{
				if ( group.uuid == item_3d.parentGroup.uuid)
				{
					isSelected = true;
					oldGroup = group;
				}
			}
			var selected = {selected: isSelected};
			if ( isSelected == true )
			{
				function open()
				{
					editorGUI.makeRightGUI_for_group( group );
				}
				buttonOpenGroup = groupFolder.add( { open: open }, "open" ).name( "Open " + group.parameters.auto_label );
			}
			else
			{
				var groupChecked = groupFolder.add( selected, "selected" ).name( group.parameters.auto_label );
				childs.push( groupChecked);
				groupChecked.onChange(   
										function( value ) 
										{  
											if ( value == false )
											{
												selected.selected = true;
												var text = "You can't deselect group.\n";
												text += "You can select new one, then, this group will be deselected.";
												new Dialog( text, "Info" );
											}
											else
											{
												selected.selected = false;
												confirmNewGroup( group );
											}
										}   
									);
			}
		}
		insertScene();	
		var group_array = editorGUI.siteApp.sceneObjects.group_array;
		for ( var i = 0; i < group_array.length; i++ ) 
		{
			var group = group_array[i];
			insertGroup( group );
		};
	}
	insert();
};

var Item_3d_GUI = function( editorGUI, item_3d)
{ 
	this.editorGUI = editorGUI;
	this.item_3d = item_3d;

	var mesh;
	if ( item_3d.group !== null )
	{
		mesh = item_3d.group;
	}
	else
	{
		mesh = item_3d.mesh;
	}
	
	this.mesh = mesh;
	
	var auto_label = item_3d.auto_label
	this.auto_label = auto_label;
	item_3d_gui = this;

	var topFolder;
	var positionGUI;
	//Not inserted
	var gui = new dat.GUI( { autoPlace: false } );
	gui.domElement.style[ "max-height" ] = (window.innerHeight - 10 ) + 'px';
	gui.domElement.style[ "overflow-y" ] = "scroll";

	this.gui = gui;
	editorGUI.right_top_div.appendChild( gui.domElement );

	editorGUI.siteApp.lookAt( item_3d.absolutePosition() );
	
	function insertTopFolder()
	{
		topFolder = gui.addFolder( auto_label );	
		item_3d_gui.topFolder = topFolder;
		topFolder.open();
	}

	function free()
	{
		gui.domElement.innerHTML = '';
	}
	this.free = free;

	insertTopFolder();
	
	var groupGUI = new GroupGUI( editorGUI, gui, item_3d, topFolder );

	var positionGUI = new PositionGUI( editorGUI, gui, mesh, topFolder, "Position", item_3d.absolutePosition );
	new RotationGui( editorGUI, gui, item_3d, topFolder );
	new ScaleGui( editorGUI, gui, item_3d, topFolder );

	var type = item_3d.geometry_name;
	if ( type == "TextGeometry" )
	{
		new Text3DGUI( item_3d_gui );
	}
	else if ( type == "BoxGeometry" )
	{
		new BoxGUI( item_3d_gui );
	}
	else if ( type == "PlaneGeometry" )
	{
		new PlainGUI( item_3d_gui );
	}
	else if ( type == "CylinderGeometry" )
	{
		new CylinderGUI( item_3d_gui );
	}
	else if ( type == "SphereGeometry" )
	{
		new SphereGUI( item_3d_gui );
	}
	else if ( type == "CustomSphere" )
	{
		new SphereCustomGUI( item_3d_gui );
	}
	
	this.material = new ObjectMaterijal( item_3d_gui );

	function select() { editorGUI.siteApp.lookAt( item_3d.absolutePosition() ); }
	topFolder.add( {select: select}, 'select' ).name( 'Select' );

	function remove()
	{ 
		new RemoveObject3d( editorGUI, item_3d);
	}
	topFolder.add( {remove: remove}, 'remove' ).name( 'Remove' );

	function code()
	{ 
		new Snippet( editorGUI, item_3d);
	}
	topFolder.add( {code: code}, 'code' ).name( 'JS code' );

	// function material_name()
	// { 
	// 	var name = "null";
	// 	var map = item_3d_gui.mesh.material.map;
	// 	if ( isNull( map ) == false )
	// 	{
	// 		name = map.name;
	// 	}
	// 	alert( name );
	// }
	// topFolder.add( {material_name: material_name}, 'material_name' ).name( 'Material name' );
};