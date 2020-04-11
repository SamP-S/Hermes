// LEVEL CONSTANT PROPERTIES
const STAGE = {
  LEVELS : 3,
  LENGTH : 12
}

const PROBABILITY = {
  TRAP : 0.05,
  LEVEL: 0.9
}

const TILE = {
  FLOOR : 0,
  FlOOR_CEILING : 1,
  AIR : 2,
  TRAP : 3,
  TRAP_THIN : 4,
  TRAP_FLOOR : 5,
  TRAP_CEILING : 6
}

/*
Thesis on Level Design:
Cause of the game being continuous the level cannot be static unless we made some form of "single player" or "level" game mode which may be possible later.
Therefore, the level design will be a consistent dynamic structure of objects.
Top doggy is the stage which will contain a 2D array forming a grid structure where each item in the grid will be a tile.
The grid will consist of a pre-determined number of rows (currently set at 3) and a set length (12). ** potentially make the stages a dynamic length
The length of the stage will be >> the displayed scene.
Because of this concept, only 2 stages will be held in memory at one time.
Once the player moves out of the current stage, they will not be able to go back to it.
The system can then destroy the now "previous" stage and pop it off the list of stages and append a newly generated stage.

Each stage will be made from tiles.
Tiles are smaller elements of the stage. My current design will randomly generate a design for the player to travers.
The tiles will each consist as a combination of a number of things. These will be made of some preset types like minecraft blocks.
I.e. Air, Flat level with floor, floor with electric trap, lava floor, floor with boxes stacked, floor and ceiling, floor and ceiling with spikes
This will help level make level generation easier by allowing selection from a preset, "confirmed" good set of tiles
Will also allow for more ranged positioning of traps within the local space of the tile before translating all objects in the tile's scene to the stages coordinate space.

Stage will then be positioned in the world space according to time and the user's movement.

First attempt will use random selection of tiles according to some game logic rules
*/

// top left corner of tile is the ORIGIN
class Tile {

  // id is enumerated tile type; width & height in world space
  constructor(id, width, height) {
    this.scene = new THREE.Scene();
    switch (id) {
      // check enumerated TILE types for coresponding type
      case 0:

      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
    }
  }

  render(graphics) {
    graphics.render(this.scene);
  }
}


class Stage {
  constructor() {

  }
}
