class Base_Object {
  constructor(dimensions=[0,0], start_pos=[0,0], type="void") {
      this.pos = {x: start_pos[0], y:start_pos[1]}; // Top left corner of shape (if rect), otherwise centre.
      this.deltas = { dx: 0, dy: 0};
      this.dimensions = {w: dimensions[0], h: dimensions[1]};
      this.type=type;
      console.log("creating new object type: " + type)
  }

  render() {
    console.log("Error, base object class cannot be rendered.");
  }

  move() {
    this.pos.x += this.deltas.dx;
    this.pos.y += this.deltas.dy;
  }

  kill() {
    // graphically kill object
    console.log("rufus gettin deaded:)");
    delete this;
  }

};

class Base_Sprite extends Base_Object {
  constructor(dimensions, start_pos, colour = COLOURS.RED, type="enemy_base"){
    super(dimensions, start_pos, type);
    this.colour = colour;
  }

  render(){
    console.log("Still can't be rendern but will be soon");
  }

};

class Base_Static extends Base_Object {
  constructor(){
    // sort it out soom :)
    super();
  }
}
