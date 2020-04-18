var GRAVITY = 9.8;
var AIR_RESIST = 100;
// deltas refer to movement PER SECOND and need to be multiplied by time delta.

class Base_Object {
  constructor(dimensions=[0,0], pos=[0,0], type="void") {
      this.pos = {x: pos[0], y:pos[1]}; // Top left corner of shape (if rect), otherwise centre.
      this.deltas = { dx: 0, dy: 0};
      this.dimensions = {w: dimensions[0], h: dimensions[1]};
      this.type=type;
      console.log("creating new object type: " + type);
  }

  // TODO refactor collision detection to use this
  getLeft() { return this.pos.x; }
  setLeft(l) { this.pos.x = l; }
  getRight() { return this.pos.x + this.dimensions.w; }
  setRight(r) { this.pos.x = r - this.dimensions.w; }
  getTop() { return this.pos.y; }
  setTop(t) { this.pos.y = t; }
  getBottom() { return this.pos.y + this.dimensions.h; }
  setBottom(b) { this.pos.y = b - this.dimensions.h; }

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
  constructor(dimensions=[0,0], start_pos=[0,0], type="sprite_base", colour = COLOURS.RED,
              lives=0, states={none: "none"}, mass=100, row=0, max_deltas = [300, 300]){
    super(dimensions, start_pos, type);
    this.colour = colour;
    this.mass = mass;
    this.colour = colour;
    this.lives = lives;
    this.states = states;
    this.row = row;
    // TODO eventually change deltas to be % of screen
    this.max_deltas = {max_x : max_deltas[0], max_y : max_deltas[1]};
  }

  // draw routine. Must have graphics passed as parameter
  render(graphics, origin) {
    console.log("Drawing sprite (issa rectangle)");
    graphics.drawRectangle(this.pos.x + origin.x, this.pos.y + origin.y, this.dimensions.w, this.dimensions.h, this.colour);
  }

  physics(){
    // f = mnu * m * g
    this.deltas.dx *= (1 - (this.mass / 2000)); // friction
    // TODO when player height is confirmed come back here and make it real-world ish
    this.deltas.dy += (this.mass * GRAVITY - AIR_RESIST) / this.mass;
    if (this.pos.y > 300 && this.deltas.dy > 0) this.deltas.dy = 0;
  }

  check_max_speeds(){
    if (this.deltas.dx    > this.max_deltas.max_x) this.deltas.dx = this.max_deltas.max_x;
    if (this.deltas.dy    > this.max_deltas.max_y) this.deltas.dy = this.max_deltas.max_y;
    if (this.deltas.dx*-1 > this.max_deltas.max_x) this.deltas.dx = this.max_deltas.max_x*-1;
    if (this.deltas.dy*-1 > this.max_deltas.max_y) this.deltas.dy = this.max_deltas.max_y*-1;
  }

  // all_objects is list of objects that we give a fuck about
  // object offsets is a list of equal length containing x and y
  move(time=0.01, all_objects=[], object_offsets=[ {x:0, y:0}] ) {

    this.physics()

    this.check_max_speeds();

    this.pos.x += this.deltas.dx * time;

    if (!this.legal_move(all_objects, object_offsets)){
      this.pos.x -= this.deltas.dx * time;
      this.deltas.dx = 0;
    }

    this.pos.y += this.deltas.dy * time;

    if (!this.legal_move(all_objects, object_offsets)){
      this.pos.y -= this.deltas.dy * time;
      this.deltas.dy *= 0.6;
    }
  }

  // only deals with rectangular objects -- implement SAT if need to deal with more complex shapes
  // TODO fix this u shit mofo -- it's done jheez calm your tits someone's in a bad mood
  // okay so it was less fixed than was initially believed
  // is fixed now though:)
    collided(object, object_offset){
      if (this.getleft() < object.getRight() + object_offset.x &&
          this.getRight() > object.getLeft() + object_offset.x &&
          this.getTop() < object.getBottom() + object_offset.y &&
          this.getBottom() > object.getTop() + object_offset.y) {
            return true;
      } else {
          return false;
        }
    }

  // checks no collision occurs as result of move
    legal_move(objects=[], object_offsets=[]){
      let toReturn = true;
      
      if (objects.length !== object_offsets.length ) {
        console.log("objects & object offsets not aligned")
        return false; }

      objects.forEach((object, i) => {
        if (this.collided(object, object_offset[i])){
          console.log("legal move returns false");
          toReturn = false;
        }
      });
      console.log("legal move returns true");
      return toReturn;
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
