const ORTH = 2;
var ASPECT = window.innerWidth/window.innerHeight;

class Graphics {

  constructor() {
      this.scene = new THREE.Scene();
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

      this.geometry = new THREE.BoxGeometry();
      this.material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
      this.cube = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.cube);
      this.material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
      this.lines = new THREE.Line(this.geometry, this.material);
      this.scene.add(this.lines);
  }

  /*
  windowResize() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  */

  // render/animation loop
  render() {
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
