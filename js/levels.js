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
  AIR : 0,
  FLOOR : 1,
  TRAP : 2,
  TRAP_THIN : 3,
  TRAP_FLOOR : 4,
  TRAP_CEILING : 5
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
class Tile extends Base_Object {

  // id is enumerated tile type; dimensions(width & height) in world space
  constructor( dimensions, pos, id) {
    super( dimensions, pos, "tile_" + id.toString() );
    this.objects = [];
    switch (id) {
      // check enumerated TILE types for coresponding type
      case 0:
        break;
      case 1:
        this.objects.push(new Base_Static([this.dimensions.w, this.dimensions.h / 8], [0, 7 * this.dimensions.h / 8 ], "static_floor", COLOURS.LGREY, false));
        break;
      case 2:
        break;
      case 3:
        this.objects.push(new Base_Static([this.dimensions.w, this.dimensions.h / 8], [0, 7 * this.dimensions.h / 8 ], "static_floor_trap", COLOURS.RED, true));
        break;
      case 4:
        break;
      case 5:
        break;
      case 6:
        break;
    }
  }

  render(graphics, origin) {
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].render(graphics, origin);
    }
  }

  kill() {
    delete this.objects;
    this.objects = [];
  }
}


class Stage extends Base_Object {
  constructor(dimensions = [0,0], pos = [0, 0], type = "stage", cols = 6, rows = 3) {
    super(dimensions, pos, type);

    this.tiles = [];
    let col = [];
    let x = this.left;
    let y = this.top;
    let t;

    let grid = [
      [1, 1, 1],
      [1, 1, 1],
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
      [3, 3, 1]
    ];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        t = new Tile([this.dimensions.w / cols, this.dimensions.h / rows], [x, y], grid[i][j]);
        col.push(t);
        y += this.dimensions.h / rows;
      }
      this.tiles.push(col);
      x += this.dimensions.w / cols;
      y = 0;
      col = [];
    }
  }

  render(graphics) {
    for (let i = 0; i < this.tiles.length; i++) {
      let col = this.tiles[i];
      for (let j = 0; j < col.length; j++) {
        col[j].render(graphics, col[j].pos);
      }
    }
  }
}

class Level extends Base_Object {
  constructor() {
    super();

  }
}
