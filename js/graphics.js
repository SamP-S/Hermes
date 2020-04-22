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
  LAVA    : 0xde8f18
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

function screen_to_world(pos, graphics) {
  return {
    x: (pos.x / graphics.renderer.domElement.width) * 2 - 1,
    y: (pos.y / graphics.renderer.domElement.height) * 2 - 1
  };
}

function world_to_screen(pos, graphics) {
  return {
    x: ((pos.x + 1) / 2) * graphics.renderer.domElement.width,
    y: ((pos.y + 1) / 2) * graphics.renderer.domElement.height
  };
}

function screen_to_geometry(pos, dimensions) {
  // Size dictionary for the canvas Size
  let size = {
    w: g.renderer.domElement.width ,
    h: g.renderer.domElement.height
  };

  // GL Space coordinates from the screen ("pixel") coordinates
  let world_x = (pos.x / size.w) * 2 - 1;
  let world_y = (pos.y / size.h) * 2 - 1;
  let world_w = (dimensions.w / size.w) * 2;
  let world_h = (dimensions.h / size.h) * 2;

  let geometry = new THREE.BoxGeometry(world_w, world_h, 0.01);
  let t = new THREE.Vector2( world_x + world_w / 2, world_y + world_h / 2 );
  geometry.translate(t.x, t.y, 0);
  return geometry;
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



/// Garbage Collecting ///

function disposeMaterial(mtrl) {
  if (mtrl.map) mtrl.map.dispose();
  if (mtrl.lightMap) mtrl.lightMap.dispose();
  if (mtrl.bumpMap) mtrl.bumpMap.dispose();
  if (mtrl.normalMap) mtrl.normalMap.dispose();
  if (mtrl.specularMap) mtrl.specularMap.dispose();
  if (mtrl.envMap) mtrl.envMap.dispose();
  mtrl.dispose();
}

// Dispose of single object in array
function disposeNode(parentObject) {
    parentObject.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
            if (node.geometry) {
                node.geometry.dispose();
            }
            if (node.material) {
                var materialArray;
                if (node.material instanceof THREE.MeshFaceMaterial || node.material instanceof THREE.MultiMaterial) {
                    materialArray = node.material.materials;
                }
                else if(node.material instanceof Array) {
                    materialArray = node.material;
                }
                if(materialArray) {
                    materialArray.forEach(function (mtrl, idx) {
                      disposeMaterial(mtrl);
                    });
                }
                else {
                    disposeMaterial(node.material);
                }
            }
        }
    });
}

// Dispose of object: disposeHierarchy (YOUR_OBJECT3D, disposeNode);
function disposeHierarchy (node, callback)
{
    for (var i = node.children.length - 1; i >= 0; i--)
    {
        var child = node.children[i];
        disposeHierarchy (child, callback);
        callback (child);
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
        this.renderer.setSize(window.innerWidth * 0.8, (window.innerWidth * 0.8 / 16) * 9);
      } else {
        this.renderer.setSize((window.innerHeight * 0.8 / 9) * 16, window.innerHeight * 0.8);
      }

      this.renderer.setClearColor(0xffffff);
      this.renderer.antialias = true;
      this.renderer.autoClear = false;
      this.renderer.domElement.style.border = "thin solid #0000FF";
      document.getElementById("canvas").appendChild(this.renderer.domElement);

      // Resize Event Listener <-- ADD LATER
      //window.addEventListener("resize", this.windowResize);

      // Added fixed dependencies that can be modified per each drawRectangle call
      // This removes the need to destroy the objects as they're reused to improve performance
      // Draw Rectangle Dependencies
      this.draw = { scene: new THREE.Scene() };
      this.draw.scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0.1), MATERIAL.WHITE));
  }

  /*
  windowResize() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  */

  // Draws Filled rectangle using pixel co-ordinates
  // enter colour as hex -> 0x------
  /*

  ///--DEPRECATED--///

  drawRectangle(pixel_x, pixel_y, pixel_w, pixel_h, colour) {
    // No validation on input so no negative widths and shit alwite
    let timer = new Timer();

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

    // Generate box geometry
    let geometry = new BoxGeometry(world_w, world_h, 0.01);

    // Translates from centre (0, 0)
    let t = new THREE.Vector2( world_x + world_w / 2, world_y + world_h / 2 );
    geometry.translate(t.x, t.y, 0);

    // Basic Matrial of Solid Colour
    let material = new THREE.MeshBasicMaterial( { color : colour } )

    // Combine geometry and material
    let mesh = new THREE.Mesh(geometry, material);
    // Make scene
    let scene = new THREE.Scene();
    scene.add(mesh);
    console.log("drawRectangle preprocessing time ", timer.getTime());

    // Draw Call
    this.render(scene);
    console.log("drawRectangle render time ", timer.getTime());

    /// Garbage collecting ///
    disposeHierarchy (scene, disposeNode);
    disposeNode (mesh);
    disposeMaterial(material);
    geometry.dispose();
    scene.dispose();
    console.log("drawRectangle disposal time ", timer.getTime());
  }

  // Simplified Draw call by passing an objects scene
  render(scene) {
    this.renderer.render(scene, this.camera);
  }
}
*/

drawRectangle(pixel_x, pixel_y, pixel_w, pixel_h, colour) {
  // No validation on input so no negative widths and shit alwite
  let timer = new Timer();

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

  let t = new THREE.Vector2( world_x + world_w / 2, world_y + world_h / 2 );

  this.draw.scene.children[0].material.color.setHex( colour );
  this.draw.scene.children[0].geometry.scale(world_w, world_h, 1);
  this.draw.scene.children[0].geometry.translate(t.x, t.y, 0);
  // console.log("drawRectangle preprocessing time ", timer.getTime());

  // Draw Call
  this.render(this.draw.scene);
  // console.log("drawRectangle render time ", timer.getTime());

  this.draw.scene.children[0].geometry.translate(-t.x, -t.y, 0);
  let div_w = 1 / world_w;
  let div_h = 1 / world_h;
  this.draw.scene.children[0].geometry.scale(div_w, div_h, 1);
  // console.log("drawRectangle postprocessing time ", timer.getTime());
}

// Simplified Draw call by passing an objects scene
render(scene) {
  this.renderer.render(scene, this.camera);
}
}



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
