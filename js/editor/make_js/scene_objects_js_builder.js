var SceneObjectsJSBuilder = function( editorGUI )
{
	var parent = document.getElementById( 'code_div' );
	parent.style.position = 'absolute';
	parent.style[ "top" ] = "2px";
	parent.style[ "left" ] = "280px";
	parent.style[ "zIndex" ] = 1;
	parent.style[ "color" ] = "#FFFFFF";
	parent.style[ "width" ] = "800px";
	parent.style[ "height" ] = window.innerHeight - 20 + 'px';
	parent.style[ "background-color" ] = 'rgba( 0, 255, 255, 0 )';
	parent.style[ "display" ] = "inherit";

	parent.innerHTML = '';
	this.parent = parent;

	this.editorGUI = editorGUI;

	this.codeDialog = new CodeDialog( this, "JavaScript code for load_scene.js" );

	var code_div = document.createElement( 'div' );
	code_div.setAttribute( "class", "code" );
	code_div.style[ "height" ] = window.innerHeight - 84 + 'px';
	code_div.style[ "margin-top" ] = "10px";
	code_div.style[ "width" ] = "780px";
	code_div.style[ "text-align" ] = "left";
	code_div.style[ "overflow-y" ] = 'scroll';
	code_div.style[ "overflow-x" ] = 'hidden';
	code_div.style[ "padding-left" ] = '10px';
	code_div.style[ "padding-top" ] = '10px';
	code_div.style[ "padding-bottom" ] = '10px';
	code_div.style[ "background-color" ] = 'rgba( 0, 0, 0, 0.75 )';
	parent.appendChild( code_div );
	this.code_div = code_div;
	var makeLine = new MakeLine( this );
	this.makeLine = makeLine;

	var makeStaticCode = new MakeStaticCode( this );
	var makeDynamicCode = new MakeDynamicCode( this );
}

var Snippet = function( editorGUI, item_3d)
{
	var parent = document.getElementById( 'code_div' );
	parent.style.position = 'absolute';
	parent.style[ "top" ] = "2px";
	parent.style[ "left" ] = "280px";
	parent.style[ "zIndex" ] = 1;
	parent.style[ "color" ] = "#FFFFFF";
	parent.style[ "width" ] = "800px";
	parent.style[ "height" ] = window.innerHeight - 20 + 'px';
	parent.style[ "background-color" ] = 'rgba( 0, 255, 255, 0 )';
	parent.style[ "display" ] = "inherit";

	parent.innerHTML = '';
	this.parent = parent;

	this.editorGUI = editorGUI;

	this.codeDialog = new CodeDialog( this, "JavaScript code for " + item_3d.auto_label );

	var code_div = document.createElement( 'div' );
	code_div.setAttribute( "class", "code" );
	code_div.style[ "height" ] = window.innerHeight - 84 + 'px';
	code_div.style[ "margin-top" ] = "10px";
	code_div.style[ "width" ] = "780px";
	code_div.style[ "text-align" ] = "left";
	code_div.style[ "overflow-y" ] = 'scroll';
	code_div.style[ "overflow-x" ] = 'hidden';
	code_div.style[ "padding-left" ] = '10px';
	code_div.style[ "padding-top" ] = '10px';
	code_div.style[ "padding-bottom" ] = '10px';
	code_div.style[ "background-color" ] = 'rgba( 0, 0, 0, 0.75 )';
	parent.appendChild( code_div );
	this.code_div = code_div;
	var makeLine = new MakeLine( this );
	this.makeLine = makeLine;

	var type = item_3d.geometry_name;
	if ( type == "TextGeometry" )
	{
		makeLine.line_tab_0( "var Insert3dText = " + Insert3dText + ";" );
		makeLine.line_tab_0( '\n' );
		new Text3DCode( makeLine, item_3d, '	' );
	}
	else if ( type == "BoxGeometry" )
	{
		makeLine.line_tab_0( "var InsertBoxMesh = " + InsertBoxMesh + ";" );
		makeLine.line_tab_0( '\n' );
		new BoxCode( makeLine, item_3d, '' );	
	}
	else if ( type == "PlaneGeometry" )
	{
		makeLine.line_tab_0( "var InsertPlainMesh = " + InsertPlainMesh + ";" );
		makeLine.line_tab_0( '\n' );
		new PlainCode( makeLine, item_3d, '' );
	}
	else if ( type == "CylinderGeometry" )
	{
		makeLine.line_tab_0( "var InsertCylinderMesh = " + InsertCylinderMesh + ";" );
		makeLine.line_tab_0( '\n' );
		new CylinderCode( makeLine, item_3d, '' );
	}
	else if ( type == "SphereGeometry" )
	{
		makeLine.line_tab_0( "var InsertSphere = " + InsertSphere + ";" );
		makeLine.line_tab_0( '\n' );
		new SphereCode( makeLine, item_3d, '' );	
	}
	else if ( type == "CustomSphere" )
	{
		makeLine.line_tab_0( "var InsertCustomSphere = " + InsertCustomSphere + ";" );
		makeLine.line_tab_0( '\n' );
		new CustomSphereCode( makeLine, item_3d, '' );	
	}	
}