// Main JS
// Game Logic

var keyboard = new Keyboard();
var player = new Player();
var gameNotOver = true;
var grahics = new Graphics();

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
var cube = new THREE.Mesh(geometry, material);

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

function main() {

  while (gameNotOver) {

    //requestAnimationFrame(animate);
    graphics.render()
    graphics.scene.add(cube)
    graphics.render()
    // player_movement()
    // other object movement Processing
    // player.physics()
    // other pyshics Processing
    // Any other Processing

    //graphics.animate();

  }
}
