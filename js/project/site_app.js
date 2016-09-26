var siteApp

var url_params = {};

if ( location.search )
{
    var parts = location.search.substring( 1 ).split( '&' );

    for ( var i = 0; i < parts.length; i++ )
    {
        var nv = parts[ i ].split( '=' );
        if ( !nv[ 0 ] ) continue;
        url_params[ nv [ 0 ] ] = nv[ 1 ] || true;
    }
}

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function()
{
    if (xhttp.readyState == 4 && xhttp.status == 200 )
    {
       //alert( "OK" );
    }
};
xhttp.open( "GET", "/analitic", true );
//xhttp.send();

class InsertStats {
    constructor(siteApp) {

        siteApp.stats = new Stats()
		siteApp.stats.domElement.style.position = 'absolute'
		siteApp.stats.domElement.style.bottom = '0px'
		siteApp.stats.domElement.style.left = '0px'
		document.getElementById( 'container' ).appendChild( siteApp.stats.domElement )
    }
}

class InsertOrbitControls {

    constructor(siteApp) {

        let controlsTarget = new THREE.Object3D( )

		controlsTarget.position.y = 50
		siteApp.scene.add( controlsTarget )

		siteApp.axisHelper = new THREE.AxisHelper( 5 )
		controlsTarget.add( siteApp.axisHelper )


		let controls = new THREE.OrbitControls( siteApp.camera, siteApp.rendererGL.domElement )
		controls.addEventListener   (
                                        'change',
                                        () => ( siteApp.render() )
                                    )
		controls.dampingFactor = 0.25
		controls.enableZoom = true
		controls.rotateSpeed = 0.4
		controls.target.set(
								controlsTarget.position.x,
								controlsTarget.position.y,
								controlsTarget.position.z
							)
		controls.update()
        siteApp.controlsTarget = controlsTarget
        siteApp.controls = controls
    }
}

class LookUtils {

    constructor( siteApp ) {

        this.siteApp = siteApp

        siteApp.lookAtReset = () => ( this.lookAtReset() )
        siteApp.look = ( position ) => ( this.look( position ) )
        siteApp.lookAt = (position) => ( this.lookAt(position) )
    }

    lookAtReset()
	{
        let controlsTarget = this.siteApp.controlsTarget
        let controls = this.siteApp.controls
		let tw = new TWEEN.Tween( controlsTarget.position )
  		.to( { x: 0, y: 50, z: 0 }, 1000 )
		.easing( TWEEN.Easing.Exponential.InOut )
		.start()

		tw.onUpdate	(
						function()
						{
							controls.target.set(
													controlsTarget.position.x,
													controlsTarget.position.y,
													controlsTarget.position.z
												)
							controls.update()
						}
					)
		//.onComplete( onComplete )
  		this.siteApp.animateTW.start( 1100 )
	}

    look( position )
	{
        let controlsTarget = this.siteApp.controlsTarget
        let controls = this.siteApp.controls
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

    lookAt( position )
	{
        let controlsTarget = this.siteApp.controlsTarget
        let controls = this.siteApp.controls
		let tw = new TWEEN.Tween( controlsTarget.position )
  		.to(
                { x: position.x, y: position.y, z: position.z },
                1000
            )
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
		//.onComplete( onComplete )
  		this.siteApp.animateTW.start( 1100 );
	}
}

class SiteApp {

    constructor(haveStats = true, controlsType = "orbit") {

        this.aaa = "SiteApp"
        this.scene_objects_list = [];
        this.haveStats = haveStats
        this.insertRenderer()

	    // Scene
	    this.scene = new THREE.Scene()

        this.axisHelper = new THREE.AxisHelper( 30 )
		this.scene.add( this.axisHelper )

	    // Camera
	    this.camera = new THREE.PerspectiveCamera  (   40,
                                                        window.innerWidth / window.innerHeight,
                                                        1,
                                                        10000
                                                    )
        this.camera.position.set(-100, 200, 400)

        //Lights
		this.lights = new Lights( this )

        //Sky
		this.sky = new Sky( this )

        //Scene Objects
		this.sceneObjects = new SceneObjects( this )

        //Stats
        if (haveStats) { new InsertStats( this ) }

        this.render()

        //Animate
    	this.animateTW = new AnimateTW( this )
        this.animateTW.start( 5000 )

        window.addEventListener( 'resize', ( ) => ( this.onWindowResize() ), false )

        new LookUtils(this)

        //Orbit
        if (controlsType = 'orbit') { new InsertOrbitControls ( this ) }

        //Editor
		this.bounds = 	{
							x_min: -500, x_max: 500,
							y_min: -500, y_max: 500,
							z_min: -500, z_max: -500
						}
		this.editorGUI = new EditorGUI( this, this.bounds )
    }

    insertRenderer() {

        let with_alias = url_params.with_alias
        this
        if ( ( with_alias == 'true' ) || ( with_alias == true ) )
        {
            this.rendererGL = new THREE.WebGLRenderer( { antialias: true } )
        }
        else
        {
            this.rendererGL = new THREE.WebGLRenderer( { antialias: false } )
        }
        this.rendererGL.setSize( window.innerWidth, window.innerHeight )
        document.body.appendChild( this.rendererGL.domElement )
    }

    onWindowResize() {

        this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()

		this.rendererGL.setSize( window.innerWidth, window.innerHeight )
		this.render()
    }

    render()
    {
        this.sceneObjects.render() //Mirror

		if ( this.haveStats ) {	this.stats.update() }
		this.rendererGL.render( this.scene, this.camera )
    }
}

siteApp = new SiteApp();
