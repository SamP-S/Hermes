// Main JS
// Game Logic

var keyboard = new Keyboard();
//var player = new Player();
var gameNotOver = true;
var g = new Graphics();
//var test = new Test_Object();
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

//var stage = new Stage( [g.renderer.domElement.width, g.renderer.domElement.height], [0, 0], "test_stage", 6, 3 );
var level = new Level( [g.renderer.domElement.width, g.renderer.domElement.height], [0, 0], "test_level" );

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

 function player_processing() {
   player_movement();
   /* player.move is currently paralysed -- need to speak to soom about objects and possibly write an object
     parser function, to decide which to pass into player.move */
   player.move(deltaTime, stage.tiles[0]);
 }

 function render_objects() {
   // TODO adapt this to iterate through list of objects
   player.render(g);
   stage.render(g);
 }

function main() {
  // gets time since start of last frame
  deltaTime = timer.getTime();
  timer.reset();

  // Moved the player properties display cause i wanted it but not the movement
  document.getElementById('is-it-moving').innerHTML = `x : ${level.sprites[0].pos.x.toFixed(2)}, y : ${level.sprites[0].pos.y.toFixed(2)} \ dx: ${level.sprites[0].deltas.dx.toFixed(2)}, dy : ${level.sprites[0].deltas.dy.toFixed(2)}`;

  let t = level.getTiles(level.sprites[0].getLeft(), level.sprites[0].getRight(), level.sprites[0].getTop(), level.sprites[0].getBottom());

  // asks for new frame for rendering
  requestAnimationFrame(main);

  // player_movement()
  // other object movement Processing
  // other pyshics Processing
  // Any other Processing
  //g.renderer.clear();
  level.move(keyboard);
  level.render(g);
  //player_processing();
  //player.render(g);
  //render_objects();

}
