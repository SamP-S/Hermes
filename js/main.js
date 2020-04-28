// Main JS
// Game Logic

var keyboard = new Keyboard();
var gameNotOver = true;
var g = new Graphics();
var timer = new Timer();

function player_movement() {

  if (keyboard.GetKeyState('A')) {
    level.sprites[0].deltas.dx -= 80;
  }

  if (keyboard.GetKeyState('W') && !level.sprites[0].states.jumping) {
    level.sprites[0].deltas.dy -= 500;
    level.sprites[0].states.jumping = true;
  }

  if (keyboard.GetKeyState('D')) {
    level.sprites[0].deltas.dx += 80;
  }

}

var deltaTime = 0.00;
timer.start();

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

function object_preprocessing(tiles) {
  let toReturn = [[], []];
  let temp;
  tiles.forEach((tile, i) => {
    tile.objects.forEach((object, j) => {
      let stage = level.stages[tile.stageId - level.stages[0].id];
      temp = {x: tile.pos.x, y : tile.pos.y};
      temp.x += stage.pos.x;
      temp.y += stage.pos.y;
      toReturn[0].push( object );
      toReturn[1].push( temp );
    });
  });
  return toReturn;
}

function player_processing() {
  let t = level.getTiles(level.sprites[0].getLeft(), level.sprites[0].getRight(), level.sprites[0].getTop(), level.sprites[0].getBottom());
  let offsets = [];

  for (let i = 0; i < t.length; i++) {
    let stage = level.stages[t[0].stageId - level.stages[0].id];
    offsets.push({X:t[i].pos.x + stage.pos.x, y:t[i].pos.y + stage.pos.y});
  }

  let hold = object_preprocessing(t);
  player_movement();
  level.sprites[0].update(deltaTime/1000, hold[0], hold[1]);

 }

function main() {
  // gets time since start of last frame
  deltaTime = timer.getTime();
  timer.reset();

  document.getElementById('is-it-moving').innerHTML = `<p> x : ${level.sprites[0].pos.x.toFixed(2)}, y : ${level.sprites[0].pos.y.toFixed(2)}
                                            \ dx: ${level.sprites[0].deltas.dx.toFixed(2)}, dy : ${level.sprites[0].deltas.dy.toFixed(2)} </p>`;

  requestAnimationFrame(main);
  level.move(deltaTime/1000);
  level.render(g);
  level.update();

  player_processing();

}
