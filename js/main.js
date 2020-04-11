// Main JS
// Game Logic

var keyboard = new Keyboard();
var player = new Player();
var gameNotOver = true;
var g = new Graphics();
var test = new Test_Object();

function player_movement() {

  if (keyboard.GetKeyState('A')) {
    player.deltas[0] -= 0.5;
  } /* else if (player.deltas[0] < 0 ) {
    player.deltas[0] += 1;
  } */

  if (keyboard.GetKeyState('W') && !player.jumping[0]) {
    player.deltas[1] += 20;
    player.jumping[0] = true
  }

  if (keyboard.GetKeyState('D')) {
    player.deltas[0] += 0.5;
  } /* else if (player.deltas[0] > 0 ) {
    player.deltas[0] -= 1;
  } */

}


// WebGL compatibility check
if (!g.renderer) {
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

  // player_movement()
  // other object movement Processing
  // player.physics()
  // other pyshics Processing
  // Any other Processing
  //g.renderer.clear();
  player.movement();
  player.render(g);

  // test
  //g.drawRectangle(100, 100, g.renderer.domElement.width - 100, g.renderer.domElement.height - 100, COLOURS.GREEN);
  //g.drawRectangle(0, 0, 100, 100, COLOURS.GREY);

}
