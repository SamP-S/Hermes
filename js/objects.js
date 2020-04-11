var colours = new Colours();

class object {
  constructor() {
      this.pos = {x: 0, y:0}; // Top left corner of shape (if rect), otherwise centre.
      this.deltas = { dx: 0, dy: 0};
      this.dimensions = {width: 0, height: 0};
      this.color = colours.MGREY;
      this.fixed_y = true;
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
