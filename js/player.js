class Player {
  constructor() {
    this.pos.x = 100;
    this.pos.y = 100;
    this.mass = 80;
    this.jumping = [false, false];
    this.dbljump = false;
    this.deltas = [0, 0];
  }

  physics() {
    this.deltas[0] *= 0.9; // friction
    this.deltas[1] -= 1.5; // friction
  }

  move() {
    this.pos.x += this.deltas[0];
    this.pos.y += this.deltas[1];
  }

};
