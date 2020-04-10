// Main JS
// Game Logic

var keyboard = new Keyboard();
var player = new Player();
var graphics = new Graphics();


// WebGL compatibility check
if (!graphics.renderer) {
  let p = document.createElement("P");
	p.innerHTML = "ERROR: WebGL is NOT supported";
	document.body.appendChild(p);
} else {
  // Initiation Functions
  // ...
  document.addEventListener('keydown', function(event) { keyboard.KeyDown(event) } );
  document.addEventListener('keyup', function(event) { keyboard.KeyUp(event) } );
  // Enter main loop
  main();
}

function main() {
  requestAnimationFrame(main);


  graphics.render();
}
