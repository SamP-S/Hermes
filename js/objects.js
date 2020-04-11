var colours = new Colours();

class Object {
  constructor(dimensions=[10,10], start_pos=[0,0], colour=colours.GREY) {
      this.pos = {x: start_pos[0], y:start_pos[0]}; // Top left corner of shape (if rect), otherwise centre.
      this.deltas = { dx: 0, dy: 0};
      this.dimensions = {width: dimensions[0], height: dimensions[1]};
      this.fixed_y = true;
      this.colour = colour;
  }

  draw() {
    console.log("Error, base object class cannot be drawn.");
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

class Enemy extends Object {
  constructor(dimensions, start_pos){
    super.constructor(dimensions, start_pos, colours.RED)

  }
};
