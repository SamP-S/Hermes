// LEVEL CONSTANT PROPERTIES
const PROBABILITY = {
  TRAP : 0.05,
  LEVEL: 0.9
}

const TILE = {
  AIR : 0,
  FLOOR : 1,
  TRAP : 2,
  TRAP_FLOOR : 3,
  TRAP_THIN : 4,
  TRAP_CEILING : 5
}

function pop_head(arr=[0,0]) {
  let new_arr = [];
  for (let i = 1; i < arr.length; i++) {
    new_arr.push(arr[i]);
  }
  return new_arr;
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
  constructor( dimensions, pos, id, col, row, stageId) {
    super( dimensions, pos, "tile_" + id.toString() + "_x" + pos[0].toString() + "y" + pos[1].toString() );
    this.objects = [];
    this.col = col;
    this.row = row;
    this.stageId = stageId;
    switch (id) {
      // check enumerated TILE types for coresponding type
      case 0:
        break;
      case 1:
        this.objects.push(new Base_Static([this.dimensions.w, this.dimensions.h / 8], [0, 7 * this.dimensions.h / 8 ], "static_floor", COLOURS.LGREY, false));
        break;
      case 2:
        this.objects.push(new Base_Static([this.dimensions.w, this.dimensions.h / 8], [0, 7 * this.dimensions.h / 8 ], "static_floor", COLOURS.LGREY, false));
        this.objects.push(new Base_Static([this.dimensions.w / 2, this.dimensions.h / 8], [this.dimensions.w / 4, 3 * this.dimensions.h / 4 ], "static_floor_trap", COLOURS.RED, true));
        break;
      case 3:
        this.objects.push(new Base_Static([this.dimensions.w, this.dimensions.h / 8], [0, 7 * this.dimensions.h / 8 ], "static_floor_trap", COLOURS.RED, true));
        break;
      case 4:
        this.objects.push(new Base_Static([this.dimensions.w, this.dimensions.h / 8], [0, 7 * this.dimensions.h / 8 ], "static_floor", COLOURS.LGREY, false));
        this.objects.push(new Base_Static([this.dimensions.w / 4, this.dimensions.h / 2], [ 3 * this.dimensions.w / 8, 3 * this.dimensions.h / 8 ], "static_floor", COLOURS.LGREY, true));
        break;
      case 5:
        this.objects.push(new Base_Static([this.dimensions.w, this.dimensions.h / 8], [0, 7 * this.dimensions.h / 8 ], "static_floor", COLOURS.LGREY, false));
        this.objects.push(new Base_Static([this.dimensions.w / 2, this.dimensions.h / 8], [this.dimensions.w / 4, 0 ], "static_floor", COLOURS.RED, true));
        break;
    }
  }

  render(graphics, origin) {
    for (let i = 0; i < this.objects.length; i++) {
      this.objects[i].render(graphics, { x:this.pos.x + origin.x, y:this.pos.y + origin.y });
    }
  }

  kill() {
    delete this.objects;
    this.objects = [];
  }
}


class Stage extends Base_Object {
  constructor(dimensions = [0,0], pos = [0, 0], type = "stage", id = -1, cols = 6, rows = 3) {
    super(dimensions, pos, type);

    this.id = id;
    this.cols = cols;
    this.rows = rows;

    this.tiles = [];
    let col = [];
    // x starts at 0 as is relative to stage position - changed from stage.pos.x in earlier version
    let x = 0;
    let y = 0;
    let t;

    // how is this orientated ?? please comment in :)
    // top on left -> bottom on right
    let grid = [
      [1, 0, 1],  // col 0
      [1, 1, 1],  // col 1
      [1, 2, 0],  // etc
      [1, 3, 1],
      [1, 4, 0],
      [1, 5, 1]
    ];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        t = new Tile([this.dimensions.w / cols, this.dimensions.h / rows], [x, y], grid[i][j], i, j, this.id);
        col.push(t);
        y += this.dimensions.h / rows;
      }
      this.tiles.push(col);
      x += this.dimensions.w / cols;
      y = 0;
      col = [];
    }
  }

  render(graphics, origin) {
    for (let i = 0; i < this.tiles.length; i++) {
      let col = this.tiles[i];
      for (let j = 0; j < col.length; j++) {
        col[j].render(graphics, { x:this.pos.x + origin.x, y:this.pos.y + origin.y });
      }
    }
  }
}


// level object will contain a list of stages
// Each will have an ID refering to what level it is
// "-1" id denotes an enless level.
// Only implementing the endless level for now but will leave room to make static levels in the future
// player MUST be sprites[0]
class Level extends Base_Object {
  constructor(dimensions = [0,0], pos = [0,0], type = "level", id = -1) {
    super(dimensions, pos, type);
    if (id == -1) { this.type += "_endless"; }
    else { this.type += "_static"; }
    this.id = id;
    this.stages = [];
    this.stages.push(new Stage( [g.renderer.domElement.width, g.renderer.domElement.height], [0, 0], "level_stage", this.stages.length , 6, 3 ));
    this.stages.push(new Stage( [g.renderer.domElement.width, g.renderer.domElement.height], [g.renderer.domElement.width, 0], "level_stage", this.stages.length , 6, 3 ));
    this.sprites = [];
    this.sprites.push(new Player());
  }

  // Use to append or pop stages from the list according to the player position
  update() {
    // If static then leave
    if (this.id != -1) { return ; }

    /* pos mod width
      if gone too far -- add new stage onto end
      if outside of stage.head() + 100 -- pop
      */

    if (this.stages.length < 3) {
      let s_width = g.renderer.domElement.width;
      if (Math.abs(this.pos.x) % s_width > s_width * 0.8 ) {
        this.add_stage();
      }
    } else {
      let first_stage = this.stages[0];
      let stage_right = first_stage.pos.x + first_stage.dimensions.w;
      if ( Math.abs(this.pos.x) > stage_right*1.1) {
        this.stages = pop_head(this.stages)
      }
    }
  }

  add_stage() {
    let last_stage = this.stages[this.stages.length - 1];
    let new_x = last_stage.pos.x + last_stage.dimensions.w;
    let new_stage_num = last_stage.id + 1;
    this.stages.push( new Stage([g.renderer.domElement.width, g.renderer.domElement.height], [new_x, 0], "level_stage", new_stage_num, 6, 3) );
  }

  // Move function as the level moves not the player
  move(time) {
    // horizontal movity move
    this.pos.x -= this.sprites[0].deltas.dx * time;
    this.sprites[0].pos.x += this.sprites[0].deltas.dx * time;

    // vertical player movement doesn't move the level (as I understand it)
  }

  render(graphics) {
    for (let i = 0; i < this.stages.length; i++) {
      this.stages[i].render(graphics, this.pos);
    }
    for (let i = 0; i < this.sprites.length; i++) {
      this.sprites[i].render(graphics, this.pos);
    }
  }

  // Get list of stages the player is in
  // Min 1
  // Max 2
  // Used in getTiles

  getStages(left, right, top, bottom) {
    let s = [];
    let l, r;
    for (let i = 0; i < this.stages.length; i++) {
      l = this.stages[i].getLeft();
      r = this.stages[i].getRight();

      // Check which stage(s) left and right are in
      if (left > l && left < r && right > l && right < r) {
        s.push(this.stages[i]);
        break;
      } else if (left > l && left < r) {    // does && left simply mean checking left is !== 0 ?? -- yes that was the problem lmao
        s.push(this.stages[i]);
        continue;
      } else if (right > l && right < r) {
        s.push(this.stages[i]);
        break;
      }
    }
    return s;
  }

  getTiles(left, right, top, bottom) {
    let s = this.getStages(left, right, top, bottom);
    let rows = [];
    let cols = [];
    let tiles = [];
    let l, r, t, b, n_cols, n_rows, stage;
    for (let iter = 0; iter < s.length; iter++) {
      stage = s[iter];

      // Check tile layout
      if (stage.cols == 0 || stage.rows == 0) { continue; }   // this is redundant ??

      // Adjust coordinate space
      l = left - stage.getLeft();
      r = right - stage.getLeft();
      t = top - stage.getTop();
      b = bottom - stage.getTop();

      // Use integer division to check row/col
      let l_col = Math.floor(l / (stage.dimensions.w / stage.cols));
      let r_col = Math.floor(r / (stage.dimensions.w / stage.cols));
      let t_row = Math.floor(t / (stage.dimensions.h / stage.rows));
      let b_row = Math.floor(b / (stage.dimensions.h / stage.rows));

      // row indexes for defined area of stage
      if (t_row >= stage.rows || b_row >= stage.rows) {
        alert("player outside of stage row limit ?!");
        return tiles;
      } else if (t_row == b_row) {
        rows.push(t_row);
      } else {
        rows.push(t_row);
        rows.push(b_row);
      }

      // column indexes for defined area of stage
      if (l < 0) {
        cols.push(r_col);
      } else if (r > stage.dimensions.w) {
        cols.push(l_col);
      } else if (l_col == r_col) {
        cols.push(l_col);
      } else {
        cols.push(l_col);
        cols.push(r_col);
      }

      for (let i = 0; i < cols.length; i++) {
        for (let j = 0; j < rows.length; j++) {
          let col = cols[i];
          let row = rows[j];
          tiles.push(stage.tiles[col][row]);
        }
      }
    }
    return tiles;
  }

}
