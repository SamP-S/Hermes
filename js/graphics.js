// Camera Constants
const ORTH = 1;
var ASPECT = window.innerWidth/window.innerHeight;
const ASPECT_RATIO = { w : 16, h : 9 };

// Colours
const COLOURS = {
  WHITE   : 0xffffff,
  BLACK   : 0x000000,
  LGREY   : 0xa3a3a3,
  MGREY   : 0x636363,
  DGREY   : 0x4a4a4a,
  RED     : 0xff0000,
  GREEN   : 0x00ff00,
  BLUE    : 0x0000ff,
  YELLOW  : 0xffff00,
  CYAN    : 0x00ffff,
  MAGENTA : 0xff00ff,
  GREY    : 0xAAAAAA,
  LAVA    : 0x455063
}


// Materials
const MATERIAL = {
  WHITE   : new THREE.MeshBasicMaterial( { color: COLOURS.WHITE } ),
  BLACK   : new THREE.MeshBasicMaterial( { color: COLOURS.BLACK } ),
  RED     : new THREE.MeshBasicMaterial( { color: COLOURS.RED } ),
  GREEN   : new THREE.MeshBasicMaterial( { color: COLOURS.GREEN } ),
  BLUE    : new THREE.MeshBasicMaterial( { color: COLOURS.BLUE } ),
  YELLOW  : new THREE.MeshBasicMaterial( { color: COLOURS.YELLOW } ),
  CYAN    : new THREE.MeshBasicMaterial( { color: COLOURS.CYAN } ),
  MAGENTA : new THREE.MeshBasicMaterial( { color: COLOURS.MAGENTA } )
}

const GEOMETRY = {
  CUBE        : new THREE.BoxGeometry(),
  CIRCLE      : new THREE.CircleGeometry(),
  CONE        : new THREE.ConeGeometry(),
  CYLINDER    : new THREE.CylinderGeometry(),
  DODECAHEDRON: new THREE.DodecahedronGeometry(),
  ICOSAHEDRON : new THREE.IcosahedronGeometry(),
  OCTAHEDRON  : new THREE.OctahedronGeometry(),
  PLANE       : new THREE.PlaneGeometry(),
  RING        : new THREE.RingGeometry(),
  SPHERE      : new THREE.SphereGeometry(),
  TETRAHEDRON : new THREE.TetrahedronGeometry(),
  TORUS       : new THREE.TorusGeometry(),
  TORUSKNOT   : new THREE.TorusKnotGeometry()
}

class Test_Object {
  constructor() {
    this.scene = new THREE.Scene();
    this.geometry = new THREE.BoxGeometry();

    this.cube = new THREE.Mesh(this.geometry, MATERIAL.CYAN);
    this.scene.add(this.cube);

    this.lines = new THREE.Line(this.geometry, MATERIAL.BLACK);
    this.scene.add(this.lines);
  }
}

class Graphics {

  constructor() {

      // perspective camera ->k // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
      this.camera = new THREE.OrthographicCamera(-ORTH, ORTH, -ORTH, ORTH, -ORTH, ORTH);
      //this.camera.position.z = 5;
      this.renderer = new THREE.WebGLRenderer();

      // Renderer Properties
      if (window.innerWidth / ASPECT_RATIO.w < window.innerHeight / ASPECT_RATIO.h) {
        this.renderer.setSize(window.innerWidth, (window.innerWidth / 16) * 9);
      } else {
        this.renderer.setSize((window.innerHeight / 9) * 16, window.innerHeight);
      }

      this.renderer.setClearColor(0xffffff);
      this.renderer.antialias = true;
      this.renderer.autoClear = false;
      this.renderer.domElement.style.border = "thin solid #0000FF";
      document.getElementById("canvas").appendChild(this.renderer.domElement);

      // Resize Event Listener <-- ADD LATER
      //window.addEventListener("resize", this.windowResize);

  }

  /*
  windowResize() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  */

  // Draws Filled rectangle using pixel co-ordinates
  // enter colour as hex -> 0x------
  drawRectangle(pixel_x, pixel_y, pixel_w, pixel_h, colour) {
    // No validation on input so no negative widths and shit alwite

    // Size dictionary for the canvas Size
    let size = {
      w: this.renderer.domElement.width ,
      h: this.renderer.domElement.height
    };

    // GL Space coordinates from the screen ("pixel") coordinates
    let world_x = (pixel_x / size.w) * 2 - 1;
    let world_y = (pixel_y / size.h) * 2 - 1;
    let world_w = (pixel_w / size.w) * 2;
    let world_h = (pixel_h / size.h) * 2;


    /// --- IGNORE DEPRECATED --- ///
    // Buffer Attempt
    /*
    let points = [];
    points.push(world_x.min, world_y.min, 0);
    points.push(world_x.min, world_y.max, 0);
    points.push(world_x.max, world_y.max, 0);
    points.push(world_x.max, world_y.min, 0);

    let points = [
      0,      0,      0,
      0.5,   0,      0,
      0.5,   0.5,   0,
    ];

    let pointsDictionary = [
      { x:0,    y:0,    z:0 },
      { x:0.5, y:0,    z:0 },
      { x:0.5, y:0.5, z:0 }
    ];

    let vertices = new Float32Array( [
      0,      0,      0,
      0.5,   0,      0,
      0.5,   0.5,   0,
    ] );

    let vertexDictionary = new Float32Array([
      { x:0,    y:0,    z:0 },
      { x:0.5, y:0,    z:0 },
      { x:0.5, y:0.5, z:0 }
    ]);

    let geometryBuffer = new THREE.BufferGeometry();
    //geometryBuffer.setAttribute( 'position', new THREE.BufferAttribute( vertexPoints, 3 ) );
    geometryBuffer.setFromPoints(pointsDictionary);
    let geometry = geometryBuffer;
    */

    // Shape Attempt
    /*
    let points = [];
    points.push( new THREE.Vector2( 0,    0 ) );
    points.push( new THREE.Vector2( 0.5,  0 ) );
    points.push( new THREE.Vector2( 0.5,  0.5 ) );
    points.push( new THREE.Vector2( 0,    0.5 ) );

    //points.push( new THREE.Vector2( world_x.min, world_y.min ) );
    //points.push( new THREE.Vector2( world_x.max, world_y.min ) );
    //points.push( new THREE.Vector2( world_x.max, world_y.max ) );
    //points.push( new THREE.Vector2( world_x.min, world_y.max ) );

    //for ( var i = 0; i < points.length; i ++ ) points[ i ].multiplyScalar( 100 );

    let shape = new THREE.Shape(points);
    let geometry = new THREE.ShapeGeometry(shape);
    */

    /// --- NORMAL --- ///

    // Box Attempt
    // Generate box geometry
    let geometry = new THREE.BoxGeometry(world_w, world_h, 0.01);

    // Translates from centre (0, 0)
    let t = new THREE.Vector2( world_x.min + world_w / 2, world_y.min + world_h / 2 );
    geometry.translate(t.x, t.y, 0);

    // Basic Matrial of Solid Colour
    let material = new THREE.MeshBasicMaterial( { color : colour } )

    // Combine geometry and material
    let mesh = new THREE.Mesh(geometry, material);
    // Make scene
    let scene = new THREE.Scene();
    scene.add(mesh);

    // Draw Call
    this.render(scene);
  }

  // Simplified Draw call by passing an objects scene
  render(scene) {
    this.renderer.render(scene, this.camera);
  }
}

function getSquareGeometry() {
  var points = [];
  points.push(new THREE.Vector3(0, 0, 0));
  points.push(new THREE.Vector3(0, 1, 0));
  points.push(new THREE.Vector3(1, 1, 0));
  points.push(new THREE.Vector3(1, 0, 0));
  var geometry = new THREE.BufferGeometry().setFromPoints(points);
}
