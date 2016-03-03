var RemoveSpotLight = function(editorGUI, spotlight) 
{
	function remove()
	{
		var scene = editorGUI.siteApp.scene;
		var spotLights = editorGUI.siteApp.lights.spotLights;
		var targets = editorGUI.siteApp.lights.targets;
		
		editorGUI.closeActiveControl();

		//var spotlight = spotLights[i];
		scene.remove(spotlight);
		editorGUI.siteApp.render();

		if (editorGUI.currentRightControll.guiName != 'Lights')
		{
			editorGUI.openLightAgain();
		}
		//editorGUI.currentRightControll.removeSpotLight(i);
		editorGUI.currentRightControll.removeSpotLight(spotlight);
		spotlight.remove_lights.remove(spotlight.remove_button);
	}

	function onClick(val)
	{
		if ( val == 1 ) { remove(); }
	}
	new DialogYesNo("Do you want to remove " + spotlight.auto_label, "Remove Spot Light", onClick);
};

var RemovePointLight = function(editorGUI, pointlight) 
{
	function remove()
	{
		var scene = editorGUI.siteApp.scene;
		var pointLights = editorGUI.siteApp.lights.pointLights;
		
		editorGUI.closeActiveControl();

		scene.remove(pointlight);
		editorGUI.siteApp.render();

		if (editorGUI.currentRightControll.guiName != 'Lights')
		{
			editorGUI.openLightAgain();
		}
		//editorGUI.currentRightControll.removeSpotLight(i);
		editorGUI.currentRightControll.removePointLight(pointlight);
		pointlight.remove_lights.remove(pointlight.remove_button);
	}
	function onClick(val)
	{
		if ( val == 1 ) { remove(); }
	}
	new DialogYesNo("Do you want to remove " + pointlight.auto_label, "Remove Point Light", onClick);
};

var AddSpotLight = function(editorGUI, remove_lights) 
{
	var scene = editorGUI.siteApp.scene;
	var spotLights = editorGUI.siteApp.lights.spotLights;
	var targets = editorGUI.siteApp.lights.targets;
	editorGUI.closeActiveControl();

	var spotlight;
	var lightTarget;
	
	function insert()
	{
		spotlight = new THREE.SpotLight(0xff7800);   
		spotlight.position.set(-160, 150, 100);   
		spotlight.intensity = 8;   
		spotlight.distance = 1600;   
		spotlight.angle = 0.624;   
		spotlight.exponent = 19.3;   
		spotlight.decay = 7.7;   
		scene.add(spotlight);   
		spotLights.push(spotlight);   
		var max_ = editorGUI.siteApp.lights.getSpotMax();
		spotlight.auto_label = 'Spot light ' + max_;

		// Target 0   
		lightTarget = new THREE.Object3D();   
		lightTarget.position.set(-150, 10, 100);   
		scene.add(lightTarget);   
		spotlight.target = lightTarget;	   
		targets.push(lightTarget);
		lightTarget.auto_label = 'Spot taget ' + max_;
	}

	insert();

	function remove()
	{
		new RemoveSpotLight(editorGUI, spotlight);
	}
	spotlight.remove_button = remove_lights.add({remove: remove}, 'remove').name(spotlight.auto_label);
	spotlight.remove_lights = remove_lights;

	if (editorGUI.currentRightControll.guiName != 'Lights')
	{
		editorGUI.openLightAgain();
	}
	editorGUI.currentRightControll.insertSpotLight(spotlight, lightTarget);
};

var AddPointLight = function(editorGUI, remove_lights) 
{
	var scene = editorGUI.siteApp.scene;
	var pointLights = editorGUI.siteApp.lights.pointLights;
	var light;
	editorGUI.closeActiveControl();

	function insert()
	{
		light = new THREE.PointLight( 0xFFFFFF, 1, 100 );   
		light.decay = 1;   
		light.position.set(-200, 50, -100);   
		scene.add( light );   
		pointLights.push(light);
		light.auto_label = 'Point light ' + editorGUI.siteApp.lights.getPointMax();
	}
	insert();

	function remove()
	{
		new RemovePointLight(editorGUI, light);
	}

	light.remove_button = remove_lights.add({remove: remove}, 'remove').name(light.auto_label);
	light.remove_lights = remove_lights;

	if (editorGUI.currentRightControll.guiName != 'Lights')
	{
		editorGUI.openLightAgain();
	}
	editorGUI.currentRightControll.insertPointLight(light);
};