// Main JS
// Game Logic

var keyboard = new Keyboard();
var player = new Player();
var gameNotOver = true;
var graphics = new Graphics();
var floor = 20; // sets height of bottom of screen for sprites


function player_movement() {

  if (keyboard.GetKeyState('A')) {
    player.deltas[0] -= 0.5;
  }

  if (keyboard.GetKeyState('W') && !player.jumping[0]) {
    player.deltas[1] += 20;
    player.jumping[0] = true
  }

  if (keyboard.GetKeyState('D')) {
    player.deltas[0] += 0.5;
  }

}


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

  //requestAnimationFrame(animate);
  // player_movement()
  // other object movement Processing
  // other pyshics Processing
  // Any other Processing

  graphics.render();

  }
