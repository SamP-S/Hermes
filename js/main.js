// Main JS
// Game Logic

var keyboard = new Keyboard();
var player = new Player();
var gameNotOver = true

function movement() {

  if (keyboard.data[1]) {
    player.deltas[0] -= 0.5;
  } else if (player.deltas[0] < 0 ) {
    player.deltas[0] += 1;
  }

  /*if (keyboard.data[2] && !player.jumping[0]) {
    player.deltas[1] += 0.1;
    player.jumping[0] = true
  } */

  if (keyboard.data[3]) {
    player.deltas[0] += 0.5;
  } else if (player.deltas[0] > 0 ) {
    player.deltas[0] -= 1;
  }

}

function main() {

  while (gameNotOver) {
    window.setTimeout(movement, 200);

  }
}
