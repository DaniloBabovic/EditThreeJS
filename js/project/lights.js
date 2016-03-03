var Lights = function(siteApp) 
{ 
	var scene = siteApp.scene; 
	var spotLights = []; 
	var targets = []; 
	var pointLights = []; 
	var ambientLight; 
 
	var _spotMax = 0; 
	var _pointMax = 0; 
 
	function getSpotMax() 
	{ 
		_spotMax += 1; 
		return _spotMax; 
	} 
	this.getSpotMax = getSpotMax; 
 
	function getPointMax() 
	{ 
		_pointMax += 1; 
		return _pointMax; 
	} 
	this.getPointMax = getPointMax; 
	
	function insertAmbientLight()
	{
		ambientLight = new THREE.AmbientLight( 0x0e0f0d );   
		siteApp.rendererGL.setClearColor( parseInt(0x000000, 16), 1 );   
		siteApp.scene.add( ambientLight );
	}

	function insertFog()   
	{   
		/*   
			FogExp2( hex, density)   
   
			.color (hex) -Fog color. Example: If set to black, far away objects will be rendered black.   
			.density - Defines how fast the fog will grow dense. Default is 0.00025.   
		*/   

		var color =0x000000;
		var density = 0.00025;
		siteApp.scene.fog = new THREE.FogExp2( color, density ); 
	}

	function insertSpot_0()   
	{
		/*    
			hex — Numeric value of the RGB component of the color.    
			intensity — Numeric value of the lights strength/intensity.    
			distance -- Maximum distance from origin where light will shine whose intensity is attenuated    
				linearly based on distance from origin.    
			angle -- Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.   
			exponent -- Rapidity of the falloff of light from its target direction.   
			decay -- The amount the light dims along the distance of the light.   
		*/

		var spotlight = new THREE.SpotLight(0xff7800);   
		spotlight.position.set(-60, 150, 100);   
		spotlight.intensity = 8;   
		spotlight.distance = 1600;   
		spotlight.angle = 0.624;   
		spotlight.exponent = 19.3;   
		spotlight.decay = 7.7;   
		siteApp.scene.add(spotlight);   
		spotLights.push(spotlight);   
		spotlight.auto_label = "Spot light " + getSpotMax();   
		
		// Target 0   
		var lightTarget = new THREE.Object3D();   
		lightTarget.position.set(150, 10, 100);   
		siteApp.scene.add(lightTarget);   
		spotlight.target = lightTarget;	   
		targets.push(lightTarget);   
		lightTarget.auto_label = "Spot taget " + _spotMax;  
	}   

	function insertSpot_1()   
	{
		/*    
			hex — Numeric value of the RGB component of the color.    
			intensity — Numeric value of the lights strength/intensity.    
			distance -- Maximum distance from origin where light will shine whose intensity is attenuated    
				linearly based on distance from origin.    
			angle -- Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.   
			exponent -- Rapidity of the falloff of light from its target direction.   
			decay -- The amount the light dims along the distance of the light.   
		*/

		var spotlight = new THREE.SpotLight(0x7ccf7c);   
		spotlight.position.set(220, 270, 360);   
		spotlight.intensity = 4.2;   
		spotlight.distance = 850;   
		spotlight.angle = 0.243;   
		spotlight.exponent = 12.3;   
		spotlight.decay = 3;   
		siteApp.scene.add(spotlight);   
		spotLights.push(spotlight);   
		spotlight.auto_label = "Spot light " + getSpotMax();   
		
		// Target 1   
		var lightTarget = new THREE.Object3D();   
		lightTarget.position.set(60, 10, 60);   
		siteApp.scene.add(lightTarget);   
		spotlight.target = lightTarget;	   
		targets.push(lightTarget);   
		lightTarget.auto_label = "Spot taget " + _spotMax;  
	}   

	function insertSpot_2()   
	{
		/*    
			hex — Numeric value of the RGB component of the color.    
			intensity — Numeric value of the lights strength/intensity.    
			distance -- Maximum distance from origin where light will shine whose intensity is attenuated    
				linearly based on distance from origin.    
			angle -- Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.   
			exponent -- Rapidity of the falloff of light from its target direction.   
			decay -- The amount the light dims along the distance of the light.   
		*/

		var spotlight = new THREE.SpotLight(0x0000ff);   
		spotlight.position.set(150, 280, 200);   
		spotlight.intensity = 2;   
		spotlight.distance = 0;   
		spotlight.angle = 1.047;   
		spotlight.exponent = 10;   
		spotlight.decay = 1;   
		siteApp.scene.add(spotlight);   
		spotLights.push(spotlight);   
		spotlight.auto_label = "Spot light " + getSpotMax();   
		
		// Target 2   
		var lightTarget = new THREE.Object3D();   
		lightTarget.position.set(0, 0, 50);   
		siteApp.scene.add(lightTarget);   
		spotlight.target = lightTarget;	   
		targets.push(lightTarget);   
		lightTarget.auto_label = "Spot taget " + _spotMax;  
	}   

	function insertPoint_0()   
	{
		/* 
			PointLight(hex, intensity, distance, decay)   
			hex — Numeric value of the RGB component of the color.    
			intensity — Numeric value of the lights strength/intensity.    
			distance -- The distance of the light where the intensity is 0. When distance is 0, then the distance is endless.    
			decay -- The amount the light dims along the distance of the light.    
		*/

		var light = new THREE.PointLight( 0xffffff, 1, 300 );   
		light.decay = 1;   
		light.position.set(50, 50, -250);   
		scene.add( light );   
		pointLights.push(light);   
		light.auto_label = "Point light " + getPointMax();   
	}   
   
	function insertPoint_1()   
	{
		/* 
			PointLight(hex, intensity, distance, decay)   
			hex — Numeric value of the RGB component of the color.    
			intensity — Numeric value of the lights strength/intensity.    
			distance -- The distance of the light where the intensity is 0. When distance is 0, then the distance is endless.    
			decay -- The amount the light dims along the distance of the light.    
		*/

		var light = new THREE.PointLight( 0xffe100, 2.2, 200 );   
		light.decay = 3.3;   
		light.position.set(-150, 90, 90);   
		scene.add( light );   
		pointLights.push(light);   
		light.auto_label = "Point light " + getPointMax();   
	}   
   
	insertAmbientLight();
	insertFog();

	insertSpot_0();
	insertSpot_1();
	insertSpot_2();

	insertPoint_0();
	insertPoint_1();

	//Public
	this.ambientLight = ambientLight;   
	this.spotLights = spotLights;   
	this.targets = targets;   
	this.pointLights = pointLights;   
}
