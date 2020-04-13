// Main JS
// Game Logic

var keyboard = new Keyboard();
var player = new Player();
var gameNotOver = true;
var g = new Graphics();
var test = new Test_Object();
var timer = new Timer();

function player_movement() {

  if (keyboard.GetKeyState('A')) {
    player.deltas[0] -= 0.5;
  }

  if (keyboard.GetKeyState('W')) {
    player.deltas[1] += 20;
    // player.jumping[0] = true
  }

  if (keyboard.GetKeyState('D')) {
    player.deltas[0] += 0.5;
  }

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

var deltaTime = 0.00;
timer.start();

function main() {
  // gets time since start of last frame
  deltaTime = timer.getTime();
  timer.reset();

  // asks for new frame for rendering
  requestAnimationFrame(main);

  // player_movement()
  // other object movement Processing
  // other pyshics Processing
  // Any other Processing
  //g.renderer.clear();

  // player draw call
  player.render(g);
  player_movement();
  player.move();


}
