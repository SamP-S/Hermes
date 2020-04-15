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
    player.deltas.dx -= 80;
  }

  if (keyboard.GetKeyState('W') && !player.states.jumping) {
    player.deltas.dy -= 500;
    player.states.jumping = true;

  }

  if (keyboard.GetKeyState('D')) {
    player.deltas.dx += 80;
  }

}

var deltaTime = 0.00;
timer.start();

var stage = new Stage( [g.renderer.domElement.width, g.renderer.domElement.height], [0, 0], "test_stage", 6, 3 );

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
  player.move(deltaTime, stage.tiles[0]);
  document.getElementById('is-it-moving').innerHTML = `x : ${player.pos.x.toFixed(2)},      y : ${player.pos.y.toFixed(2)} \
                                                       dx: ${player.deltas.dx.toFixed(2)}, dy : ${player.deltas.dy.toFixed(2)}`;

  stage.render(g);


}
