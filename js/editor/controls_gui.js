var EditorGUI = function( siteApp, bounds )
{
	var _this = this;
	this.siteApp = siteApp;
	
	this.x_min = bounds.x_min;
	this.x_max = bounds.x_max;

	this.y_min = bounds.y_min;
	this.y_max = bounds.y_max;

	this.z_min = bounds.z_min;
	this.z_max = bounds.z_max;

	//Elements
	var left_top_div = document.getElementById( 'left_top_div' );
	this.left_top_div = left_top_div;

	var active_div_parent = document.getElementById( 'active_div_parent' );
	this.active_div_parent = active_div_parent;

	var active_div = document.getElementById( 'active_div' );
	this.active_div = active_div;

	//var active_div_close = document.getElementById( 'active_div_close' );


	var right_top_div = document.getElementById( 'right_top_div' );

	this.right_top_div = right_top_div;


	var active_object_dom_element = null;
	var onCloseActiveGUI = null;

	var currentRightControll;
	

	var lightsGUI;

	function closeActiveControl()
	{
		function animate()
		{
			function onComplete()
			{
				
			}
			//right_top_div.style[ "right" ] = "-150px";	
			var tw = new TWEEN.Tween( {right: -150} )
	  		.to( { right: 10}, 700 )
			.easing( TWEEN.Easing.Exponential.InOut )
			.onComplete( onComplete )
			.start();
			tw.onUpdate	(
							function() 
							{
								right_top_div.style.right = this.right + 'px';
							}
						)
	  		siteApp.animateTW.start( 1100 );
		}

		if ( active_object_dom_element === null ) return;
		active_div_close.onclick = null;

		//right_top_div.style[ "right" ] = "10px";
		active_div.removeChild( active_object_dom_element );
		active_object_dom_element = null;
		active_div_parent.style[ "display" ] = 'none';
		if ( onCloseActiveGUI !== null )
		{
			onCloseActiveGUI()	;
			onCloseActiveGUI = null;
		}
		animate();
	}
	this.closeActiveControl = closeActiveControl;

	function insertActiveControl( object_dom_element, onClose ) 
	{
		function animate()
		{
			function onComplete()
			{
				active_div.appendChild( active_object_dom_element );
				active_div_parent.style[ "display" ] = 'inherit';
			}
			//right_top_div.style[ "right" ] = "-150px";	
			var tw = new TWEEN.Tween( {right: 10} )
	  		.to( { right: -150}, 700 )
			.easing( TWEEN.Easing.Exponential.InOut )
			.onComplete( onComplete )
			.start();
			tw.onUpdate	(
							function() 
							{
								right_top_div.style.right = this.right + 'px';
							}
						)
	  		siteApp.animateTW.start( 1100 );
		}
		closeActiveControl();
		onCloseActiveGUI = onClose;
		active_object_dom_element = object_dom_element;
		
		active_div_close.onclick = closeActiveControl;
		animate();
	}
	this.insertActiveControl = insertActiveControl;

	function openLightAgain()
	{
		function again()
		{
			currentRightControll = lightsGUI;
			lightsGUI.openAgain();
			currentRightControll.guiName = 'Lights';
			_this.currentRightControll = currentRightControll;
		}
		if (currentRightControll === null )
		{
			again();	
		}
		else
		{
			if (currentRightControll.guiName == 'Lights' )
			{
				
				//var dialog = new Dialog( "Lighs are already opened.", "Open aborted." );		

			}
			else
			{
				closeActiveControl();
				currentRightControll.free();
				currentRightControll = null;
				again();
			}
		}
	}
	this.openLightAgain = openLightAgain;

	function lookAtActive()
	{
		if (currentRightControll !== null )
		{
			if (currentRightControll.guiName == 'Lights' )
			{
				siteApp.lookAtReset();
			}
			else
			{
				siteApp.lookAt(currentRightControll.item_3d.absolutePosition() );
			}
		}
		else
		{
			siteApp.lookAtReset();
		}
	}
	this.lookAtActive = lookAtActive;

	function makeRightGUI_for_item_3d( item_3d)
	{
		if (currentRightControll !== null )
		{
			closeActiveControl();
			currentRightControll.free();
			currentRightControll = null;
		}
		var item_3d_gui = new Item_3d_GUI( this, item_3d);
		currentRightControll = item_3d_gui;
		currentRightControll.name = item_3d.auto_label;
		_this.currentRightControll = currentRightControll;
	}
	this.makeRightGUI_for_item_3d = makeRightGUI_for_item_3d;

	function makeRightGUI_for_group( group )
	{
		if (currentRightControll !== null )
		{
			closeActiveControl();
			currentRightControll.free();
			currentRightControll = null;
		}
		var group_right_gui = new GroupRightGUI( this, group );
		currentRightControll = group_right_gui;
		currentRightControll.name = group.parameters.auto_label;
		_this.currentRightControll = currentRightControll;
	}
	this.makeRightGUI_for_group = makeRightGUI_for_group;


	//LIGHTS - Start right menu
	var lights_gui_parent = new dat.GUI( { autoPlace: false } );
	lights_gui_parent.domElement.style[ "max-height" ] = (window.innerHeight - 10 ) + 'px';
	lights_gui_parent.domElement.style[ "overflow-y" ] = "scroll";

	right_top_div.appendChild( lights_gui_parent.domElement );

	lightsGUI = new LightsGUI( _this, lights_gui_parent, active_div);
	currentRightControll = lightsGUI;
	currentRightControll.guiName = 'Lights';
	this.currentRightControll = currentRightControll;

	//Left MENU
	var leftMenu = new LeftMenu( _this, left_top_div);
	this.leftMenu = leftMenu;

	//gui = new dat.GUI();
	//this.gui = gui;

	// var text3D = siteApp.siteText.textMesh1;
	// var text3D = siteApp.textMesh1;

	//var item_3d_gui = new Item_3d_GUI( this, textMesh1, "textMesh1" );
	//var item_3d_gui = new Item_3d_GUI( this, siteApp.sphereGroup, "sphere1" );
};