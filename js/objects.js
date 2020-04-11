var colours = new Colours();

class Base_Object {
  constructor(dimensions=[10,10], start_pos=[0,0], colour=colours.GREY, type="void_object") {
      this.pos = {x: start_pos[0], y:start_pos[0]}; // Top left corner of shape (if rect), otherwise centre.
      this.deltas = { dx: 0, dy: 0};
      this.dimensions = {width: dimensions[0], height: dimensions[1]};
      this.fixed_y = true;
      this.colour = COLOURS.LGREY;  // Set base colour light grey cause nice
      this.type=type
      console.log("creating new object type: " + type)
  }

  draw() {
    console.log("Error, base object class cannot be drawn.");
  }

  physics() {
    console.log("Error, base object class doesn't have physics");
  }

  move() {
    this.physics()
    this.pos.x += this.deltas.dx;
    this.pos.y += this.deltas.dy;
  }

  kill() {
    // graphically kill object
    console.log("rufus gettin deaded:)")
    delete this
  }

};

class Enemy extends Base_Object {
  constructor(dimensions, start_pos, colour = COLOURS.RED, type="enemy_base"){
    super(dimensions, start_pos, colour, type)
  }

  draw(){
    console.log("Still can't be drawn but will be soon")
  }

};

class Lava extends Enemy {
  constructor(){
    super([40, 20], [200, 380], COLOURS.LAVA, "enemy_lava")
  }
}
