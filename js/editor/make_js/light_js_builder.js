function r3(val)
{
	return Math.round(val * 1000)/1000;
}

function copyToClipboard(text) 
{
    if (window.clipboardData && window.clipboardData.setData) 
    {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text); 

    } 
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) 
    {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try 
        {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } 
        catch (ex) 
        {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } 
        finally 
        {
            document.body.removeChild(textarea);
        }
    }
}

var CodeDialog = function(lightJSBuilder, title)
{
	var parent = lightJSBuilder.parent;
	function insertTopToolbar()
	{
		function closeDialog()
		{
			parent.innerHTML = '';
			parent.style["display"] = "none";
		}

		function copy()
		{
			var text = lightJSBuilder.code_div.innerText;
			copyToClipboard(text);
		}

		var menu = document.createElement( 'div' );
		menu.setAttribute("class", "menu_item");
		menu.style["width"] = "770px";
		menu.innerText = title;
		parent.appendChild( menu );	

		var close_btn = document.createElement( 'div' );

		close_btn.setAttribute("class", "close_btn");
		close_btn.style["margin-bottom"] = "10px";

		close_btn.innerText = "Close";
		close_btn.addEventListener( 'mouseup', closeDialog, false );
		menu.appendChild( close_btn );

		var copy_btn = document.createElement( 'div' );

		copy_btn.setAttribute("class", "close_btn");
		copy_btn.style["margin-bottom"] = "10px";
		copy_btn.style["right"] = "70px";

		copy_btn.innerText = "Copy";
		copy_btn.addEventListener( 'mouseup', copy, false );
		menu.appendChild( copy_btn );
	}

	insertTopToolbar();
};

var MakeLine = function(lightJSBuilder)
{
	function line_tab_0(text)
	{
		var pre  = document.createElement( 'pre' );
		pre.innerText = text;
		lightJSBuilder.code_div.appendChild(pre);
	}
	this.line_tab_0 = line_tab_0;

	function doc(text)
	{
		var pre  = document.createElement( 'pre' );
		pre.setAttribute("class", "doc");
		pre.innerText = text;
		lightJSBuilder.code_div.appendChild(pre);
	}
	this.doc = doc;
};

var ValGetter = function(editorGUI)
{
	function ambientLightHex() 
	{ 
		var val = editorGUI.lightsGUI.vals.ambientLightVals.currentColor; 
		val = val.replace('#', '0x');
		return val;
	}
	this.ambientLightHex = ambientLightHex;

	function bgLightHex() 
	{ 
		var val = editorGUI.lightsGUI.vals.color_bg.currentColor; 
		val = val.replace('#', '0x');
		return val;
	}
	this.bgLightHex = bgLightHex;

	
	function fogLightHex() 
	{ 
		var val = editorGUI.lightsGUI.vals.fogVals.currentColor; 
		val = val.replace('#', '0x');
		return val;
	}
	this.fogLightHex = fogLightHex;

	function fogDensity() 
	{ 
		var val = editorGUI.lightsGUI.vals.fogDencity.density; 
		val =  Math.round(val * 1000000)/1000000;
		return val;
	}
	this.fogDensity = fogDensity;
	
	// SPOT
	function spotLightColor(index) 
	{
		val = editorGUI.lightsGUI.spotArray[index].vals.light_color.currentColor;
		val = val.replace('#', '0x');
		return val;	
	}
	this.spotLightColor = spotLightColor;

	function spotLightPosition(index) 
	{
		var p = editorGUI.lightsGUI.spotArray[index].vals.Position;
		return p.x + ', ' + p.y + ', ' + p.z;
	}
	this.spotLightPosition = spotLightPosition;

	function spotLightTarget(index) 
	{
		var p = editorGUI.lightsGUI.spotArray[index].vals.Target;
		return p.x + ', ' + p.y + ', ' + p.z;
	}
	this.spotLightTarget = spotLightTarget;

	function spotLightIntensity(index) 
	{
		return editorGUI.lightsGUI.spotArray[index].vals.intensity.current;
	}
	this.spotLightIntensity = spotLightIntensity;

	function spotLightDistance(index) 
	{
		return editorGUI.lightsGUI.spotArray[index].vals.distance.current;
	}
	this.spotLightDistance = spotLightDistance;

	function spotLightAngle(index) 
	{
		return editorGUI.lightsGUI.spotArray[index].vals.angle.current;
	}
	this.spotLightAngle = spotLightAngle;

	function spotLightExponent(index) 
	{
		return editorGUI.lightsGUI.spotArray[index].vals.exponent.current;
	}
	this.spotLightExponent = spotLightExponent;
	
	function spotLightExponent(index) 
	{
		return editorGUI.lightsGUI.spotArray[index].vals.exponent.current;
	}
	this.spotLightExponent = spotLightExponent;

	function spotLightDecay(index) 
	{
		return editorGUI.lightsGUI.spotArray[index].vals.decay.current;
	}
	this.spotLightDecay = spotLightDecay;

	//POINT
	function pointLightColor(index) 
	{
		var val = editorGUI.lightsGUI.pointArray[index].vals.light_color.currentColor;
		val = val.replace('#', '0x');
		return val;	
	}
	this.pointLightColor = pointLightColor;

	function pointLightPosition(index) 
	{
		var p = editorGUI.lightsGUI.pointArray[index].vals.Position;
		return p.x + ', ' + p.y + ', ' + p.z;
	}
	this.pointLightPosition = pointLightPosition;

	function pointLightIntensity(index) 
	{
		return editorGUI.lightsGUI.pointArray[index].vals.intensity.current;
	}
	this.pointLightIntensity = pointLightIntensity;
	
	function pointLightDistance(index) 
	{
		return editorGUI.lightsGUI.pointArray[index].vals.distance.current;
	}
	this.pointLightDistance = pointLightDistance;

	function pointLightDecay(index) 
	{
		return editorGUI.lightsGUI.pointArray[index].vals.decay.current;
	}
	this.pointLightDecay = pointLightDecay;
};

var LightJSBuilder = function(editorGUI, lightsGUI)
{
	var parent = document.getElementById( 'code_div' );
	parent.style.position = 'absolute';
	parent.style["top"] = "2px";
	parent.style["left"] = "280px";
	parent.style["zIndex"] = 1;
	parent.style["color"] = "#FFFFFF";
	parent.style["width"] = "800px";
	parent.style["height"] = window.innerHeight - 20 + 'px';
	parent.style["background-color"] = 'rgba(0, 255, 255, 0)';
	parent.style["display"] = "inherit";

	parent.innerHTML = '';
	this.parent = parent;

	this.editorGUI = editorGUI;
	this.lightsGUI = lightsGUI;

	this.codeDialog = new CodeDialog(this, "JavaScript code for lights.js");

	var code_div = document.createElement( 'div' );
	code_div.setAttribute("class", "code");
	code_div.style["height"] = window.innerHeight - 84 + 'px';
	code_div.style["margin-top"] = "10px";
	code_div.style["width"] = "780px";
	code_div.style["text-align"] = "left";
	code_div.style["overflow-y"] = 'scroll';
	code_div.style["overflow-x"] = 'hidden';
	code_div.style["padding-left"] = '10px';
	code_div.style["padding-top"] = '10px';
	code_div.style["padding-bottom"] = '10px';
	code_div.style["background-color"] = 'rgba(0, 0, 0, 0.75)';
	parent.appendChild( code_div );
	this.code_div = code_div;
	var makeLine = new MakeLine(this);
	this.makeLine = makeLine;

	var valGetter = new ValGetter(this);
	this.valGetter = valGetter;



	// AMBIENT
	function insertAmbient()
	{
		var txt = 'var Lights = function(siteApp) \n\
{ \n\
	var scene = siteApp.scene; \n\
	var spotLights = []; \n\
	var targets = []; \n\
	var pointLights = []; \n\
	var ambientLight; \n\ \n\
	var _spotMax = 0; \n\
	var _pointMax = 0; \n\
 \n\
	function getSpotMax() \n\
	{ \n\
		_spotMax += 1; \n\
		return _spotMax; \n\
	} \n\
	this.getSpotMax = getSpotMax; \n\
 \n\
	function getPointMax() \n\
	{ \n\
		_pointMax += 1; \n\
		return _pointMax; \n\
	} \n\
	this.getPointMax = getPointMax; \n\
	\n\
	function insertAmbientLight()\n\
	{\n\
		ambientLight = new THREE.AmbientLight( ' + valGetter.ambientLightHex() + ' );   \n\
		siteApp.rendererGL.setClearColor( parseInt('+ valGetter.bgLightHex()  + ', 16), 1 );   \n\
		siteApp.scene.add( ambientLight );\n\
	}\n\n\
';
		makeLine.line_tab_0(txt);
	}
	insertAmbient();

	// FOG
	function insertFog()
	{
		var color = valGetter.fogLightHex();
		var density = valGetter.fogDensity();

		var txt = '	function insertFog()   \n\
	{   \n';
		makeLine.line_tab_0(txt);

		var doc = '		/*   \n\
			FogExp2( hex, density)   \n\
   \n\
			.color (hex) -Fog color. Example: If set to black, far away objects will be rendered black.   \n\
			.density - Defines how fast the fog will grow dense. Default is 0.00025.   \n\
		*/   \n\n';
		makeLine.doc(doc);

		makeLine.line_tab_0('		var color =' + color + ';');
		makeLine.line_tab_0('		var density = ' + density + ';');

		var txt = '		siteApp.scene.fog = new THREE.FogExp2( color, density ); \n\
	}\n\n';
		makeLine.line_tab_0(txt);
	}
	insertFog();




	//SPOT LIGHTS
	function insertSpotLight(index)
	{
		var txt = '	function insertSpot_'+ index +'()   \n\
	{';

		makeLine.line_tab_0(txt);
		//DOC		
		var doc = '		/*    \n\
			hex — Numeric value of the RGB component of the color.    \n\
			intensity — Numeric value of the lights strength/intensity.    \n\
			distance -- Maximum distance from origin where light will shine whose intensity is attenuated    \n\
				linearly based on distance from origin.    \n\
			angle -- Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.   \n\
			exponent -- Rapidity of the falloff of light from its target direction.   \n\
			decay -- The amount the light dims along the distance of the light.   \n\
		*/\n\n';

		makeLine.doc(doc);

		var txt = '		var spotlight = new THREE.SpotLight(' + valGetter.spotLightColor(index) + ');   \n\
		spotlight.position.set(' +  valGetter.spotLightPosition(index) + ');   \n\
		spotlight.intensity = ' + valGetter.spotLightIntensity(index) + ';   \n\
		spotlight.distance = ' + r3(valGetter.spotLightDistance(index)) + ';   \n\
		spotlight.angle = ' + r3(valGetter.spotLightAngle(index)) + ';   \n\
		spotlight.exponent = ' + valGetter.spotLightExponent(index) + ';   \n\
		spotlight.decay = ' + r3(valGetter.spotLightDecay(index)) + ';   \n\
		siteApp.scene.add(spotlight);   \n\
		spotLights.push(spotlight);   \n\
		spotlight.auto_label = "Spot light " + getSpotMax();   \n\
		\n';
		
		makeLine.line_tab_0(txt);

		makeLine.doc('		// Target ' + index + '   \n');

		var txt = '		var lightTarget = new THREE.Object3D();   \n\
		lightTarget.position.set(' +  valGetter.spotLightTarget(index) + ');   \n\
		siteApp.scene.add(lightTarget);   \n\
		spotlight.target = lightTarget;	   \n\
		targets.push(lightTarget);   \n\
		lightTarget.auto_label = "Spot taget " + _spotMax;  \n\
	}   \n\n';
   		makeLine.line_tab_0(txt);
	}

	for (var i = 0; i < lightsGUI.spotArray.length; i++)
	{
		insertSpotLight(i);	
	}





	//POINT LIGHTS
	function insertPointLight(index)
	{
		var color = valGetter.pointLightColor(index);
		var position = valGetter.pointLightPosition(index);
		var intensity = r3(valGetter.pointLightIntensity(index));
		var distance = r3(valGetter.pointLightDistance(index));
		var decay = r3(valGetter.pointLightDecay(index));

		var txt = '	function insertPoint_' + index + '()   \n\
	{';
		makeLine.line_tab_0(txt);

		//DOC

		var doc = '		/* \n\
			PointLight(hex, intensity, distance, decay)   \n\
			hex — Numeric value of the RGB component of the color.    \n\
			intensity — Numeric value of the lights strength/intensity.    \n\
			distance -- The distance of the light where the intensity is 0. When distance is 0, then the distance is endless.    \n\
			decay -- The amount the light dims along the distance of the light.    \n\
		*/\n\n';

		makeLine.doc(doc);


		var txt = '		var light = new THREE.PointLight( ' + color + ', ' + intensity + ', ' + distance + ' );   \n\
		light.decay = ' + decay + ';   \n\
		light.position.set(' + position + ');   \n\
		scene.add( light );   \n\
		pointLights.push(light);   \n\
		light.auto_label = "Point light " + getPointMax();   \n\
	}   \n\
   \n';
   		makeLine.line_tab_0(txt);
	}

	for (var i = 0; i < lightsGUI.pointArray.length; i++)
	{
		insertPointLight(i);
	}	




	
	makeLine.line_tab_0('	insertAmbientLight();');
	makeLine.line_tab_0('	insertFog();\n\n');

	for (var i = 0; i < lightsGUI.spotArray.length; i++)
	{
		makeLine.line_tab_0('	insertSpot_' + i + '();');
	}
	makeLine.line_tab_0('\n');

	for (var i = 0; i < lightsGUI.pointArray.length; i++)
	{
		makeLine.line_tab_0('	insertPoint_' + i + '();');
	}

	makeLine.line_tab_0('\n');
	makeLine.doc('	//Public');

	var txt = '	this.ambientLight = ambientLight;   \n\
	this.spotLights = spotLights;   \n\
	this.targets = targets;   \n\
	this.pointLights = pointLights;   \n\
}';
	makeLine.line_tab_0(txt);	
};

