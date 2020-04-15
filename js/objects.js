class Base_Object {
  constructor(dimensions=[0,0], pos=[0,0], type="void") {
      this.pos = {x: pos[0], y:pos[1]}; // Top left corner of shape (if rect), otherwise centre.
      this.deltas = { dx: 0, dy: 0};
      this.dimensions = {w: dimensions[0], h: dimensions[1]};
      this.type=type;
      console.log("creating new object type: " + type)

      this.left = this.pos.x;
      this.right = this.pos.x + this.dimensions.w;
      this.top = this.pos.y;
      this.bottom = this.pos.y + this.dimensions.h;
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
  constructor(dimensions = [0,0], pos = [0, 0], type = "static", colour = COLOURS.LGREY, isTrap = false) {
    // sort it out soom :)
    super(dimensions, pos, type);
    this.colour = colour;
    this.isTrap = isTrap;
    this.material = new THREE.MeshBasicMaterial( { color: colour } );
    this.geometry = screen_to_geometry(this.pos, this.dimensions);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene = new THREE.Scene();
    this.scene.add(this.mesh);
  }

  render(graphics, origin) {
    graphics.drawRectangle(this.pos.x + origin.x, this.pos.y + origin.y, this.dimensions.w, this.dimensions.h, this.colour);
  }
}
