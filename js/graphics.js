var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

// Renderer Properties
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
renderer.antialias = true;
renderer.domElement.style.border = "solid";
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
var lines = new THREE.Line(geometry, material);
scene.add(lines);

// Event Listener
function windowResize() {
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", windowResize);

// render/animation loop
var animate = function() {
	requestAnimationFrame(animate);

	camera.position.z = 5;
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.rotation.z += 0.01;
	lines.rotation.x += 0.01;
	lines.rotation.y += 0.01;
	lines.rotation.z += 0.01;

	renderer.render(scene, camera);
};

var p = document.createElement("P");
// WebGL compatibility check
if (renderer) {
	p.innerHTML = "OK: WebGL is supported";
	document.body.appendChild(p);
	// Initiation Functions
	// ...

	// Enter main render loop
	animate();

} else {
	p.innerHTML = "ERROR: WebGL is NOT supported";
	document.body.appendChild(p);
}
