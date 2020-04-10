// Main JS
// Game Logic

var keyboard = new Keyboard();
var player = new Player();
var graphics = new Graphics();


// WebGL compatibility check
if (!renderer) {
  let p = document.createElement("P");
	p.innerHTML = "ERROR: WebGL is NOT supported";
	document.body.appendChild(p);
} else {
  // Initiation Functions
  // ...

  // Enter main loop
  main();
}

function main() {
  requestAnimationFrame(graphics.render);


  graphics.render();
}
