
var siteApp;
var url_params = {};

if (location.search) {
    var parts = location.search.substring(1).split('&');

    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        url_params[nv[0]] = nv[1] || true;
    }
}



var SiteApp = function()
{
  	var _this = this;
	var camera, scene, renderer, rendererGL, rendererAlias;
	var controls, controlsTarget, stats;
	

	var statsON = false;
	var haveCss3dRenderer = false;

	var wheelMenu;
	var floor;
	var lights;
	var sky;
	var editorGUI;

	var sceneObjects;

	var refract;
	var haveRefract = false;
	var nodepass;
	var composer;

	var haveGlitch = false;
	var composer1;
	
	this.scene_objects_list = [];

	function insertStats()
	{
		statsON = true;

		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.bottom = '0px';
		stats.domElement.style.left = '0px';
		document.getElementById( 'container' ).appendChild( stats.domElement );
	}

	function lookAtReset()
	{
		var tw = new TWEEN.Tween( controlsTarget.position )
  		.to( { x: 0, y: 50, z: 0 }, 1000 )
		.easing( TWEEN.Easing.Exponential.InOut )
		.start();

		tw.onUpdate	(
						function() 
						{
							controls.target.set(
													controlsTarget.position.x, 
													controlsTarget.position.y, 
													controlsTarget.position.z
												);
							controls.update();
						}
					)
		//.onComplete(onComplete)
  		animateTW.start(1100);
	}
	this.lookAtReset = lookAtReset;

	function look(position)
	{
		controlsTarget.position.x = position.x;
		controlsTarget.position.y = position.y;
		controlsTarget.position.z = position.z;
		
		controls.target.set(
								position.x, 
								position.y, 
								position.z
							);
		controls.update();
	}
	this.look = look;

	function lookAt(position)
	{
		var tw = new TWEEN.Tween( controlsTarget.position )
  		.to( { x: position.x, y: position.y, z: position.z }, 1000 )
		.easing( TWEEN.Easing.Exponential.InOut )
		.start();

		tw.onUpdate	(
						function() 
						{
							//controls.target = controlsTarget.position;
							controls.target.set(
													controlsTarget.position.x, 
													controlsTarget.position.y, 
													controlsTarget.position.z
												);
							controls.update();
						}
					)
		//.onComplete(onComplete)
  		animateTW.start(1100);
	}
	this.lookAt = lookAt;

	function insertOrbitControls()
	{
		controlsTarget = new THREE.Object3D();
		_this.controlsTarget = controlsTarget;
		controlsTarget.position.y = 50;
		scene.add(controlsTarget);

		var axisHelper = new THREE.AxisHelper( 5 );
		controlsTarget.add( axisHelper );


		controls = new THREE.OrbitControls(camera, rendererGL.domElement);
		controls.addEventListener( 'change', render );
		controls.dampingFactor = 0.25;
		controls.enableZoom = true;
		controls.rotateSpeed = 0.4;
		controls.target.set(controlsTarget.position.x, controlsTarget.position.y, controlsTarget.position.z);
		controls.update();
	}


	function insertRenderer()
	{
		// renderer
	    var with_alias = url_params.with_alias;
	    if ((with_alias == 'true') || (with_alias == true))
	    {
	    	rendererGL = new THREE.WebGLRenderer({ antialias: true });	
	    }
	    else
	    {
	    	rendererGL = new THREE.WebGLRenderer({ antialias: false });
	    }
	    rendererGL.setSize( window.innerWidth, window.innerHeight );
	    document.body.appendChild( rendererGL.domElement );
	    _this.rendererGL = rendererGL;
	}

	function init()
	{
	    insertRenderer();

	    window.addEventListener( 'resize', onWindowResize, false );

	    // scene
	    scene = new THREE.Scene();
	    _this.scene = scene;
	    
	    var axisHelper = new THREE.AxisHelper( 30 );
		scene.add( axisHelper );

	    // camera
	    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.x = -100;
		camera.position.y = 200;
		camera.position.z = 400;

		_this.camera = camera;

	
		lights = new Lights(_this);
		_this.lights = lights;

		sky = new Sky(_this);
		var sceneObjects = new SceneObjects(_this);
		_this.sceneObjects = sceneObjects;

		insertStats();

		var bounds = {x_min: -500, x_max: 500, y_min: -500, y_max: 500, z_min: -500, z_max: -500};
		insertOrbitControls();
		editorGUI = new EditorGUI(_this, bounds);
	}

	function onWindowResize()
	{
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		rendererGL.setSize( window.innerWidth, window.innerHeight );
		if (haveCss3dRenderer)
		{
			renderer.setSize( window.innerWidth, window.innerHeight );
		}
		render();
	}

	function render()
	{
		_this.sceneObjects.render(); //Mirror

		if (statsON)
		{
			stats.update();	
		}
		rendererGL.render( scene, camera );
	}

	this.render = render;
	
	init();
	this.scene = scene;
	this.controls = controls;
	this.camera = camera;
	

	render();
	
	var animateTW = new AnimateTW(this);
	animateTW.start(5000);
	this.animateTW = animateTW;

}
siteApp = new SiteApp();
