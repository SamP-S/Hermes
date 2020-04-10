// Camera Constants
const ORTH = 2;
var ASPECT = window.innerWidth/window.innerHeight;

// Materials
const MATERIAL = {
  WHITE   : new THREE.MeshBasicMaterial( { color: 0xffffff } ),
  BLACK   : new THREE.MeshBasicMaterial( { color: 0x000000 } ),
  RED     : new THREE.MeshBasicMaterial( { color: 0xff0000 } ),
  GREEN   : new THREE.MeshBasicMaterial( { color: 0x00ff00 } ),
  BLUE    : new THREE.MeshBasicMaterial( { color: 0x0000ff } ),
  YELLOW  : new THREE.MeshBasicMaterial( { color: 0xffff00 } ),
  CYAN    : new THREE.MeshBasicMaterial( { color: 0x00ffff } ),
  MAGENTA : new THREE.MeshBasicMaterial( { color: 0xff00ff } )
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
      this.camera = new THREE.OrthographicCamera(-ORTH * ASPECT, ORTH * ASPECT, -ORTH, ORTH, -ORTH, ORTH);
      //this.camera.position.z = 5;
      this.renderer = new THREE.WebGLRenderer();

      // Renderer Properties
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setClearColor(0xffffff);
      this.renderer.antialias = true;
      this.renderer.domElement.style.border = "solid";
      document.body.appendChild(this.renderer.domElement);

      // Resize Event Listener <-- ADD LATER
      //window.addEventListener("resize", this.windowResize);


  }

  /*
  windowResize() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  */

  render(scene) {
    this.renderer.render(scene, this.camera);
  }

  // render/animation loop
  test_render() {
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      this.lines.rotation.x += 0.01;
      this.lines.rotation.y += 0.01;

      this.renderer.render(this.scene, this.camera);
  }
}

function GetSquareGeometry() {
  var points = [];
  points.push( new THREE.Vector3( 1, 0, 0 ) );
  points.push( new THREE.Vector3( 0, 10, 0 ) );
  points.push( new THREE.Vector3( 10, 0, 0 ) );
  var geometry = new THREE.BufferGeometry().setFromPoints( points );
}
