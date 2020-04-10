class Player {
  constructor() {
    this.pos = [100, 100]
    this.mass = 80;
    this.jumping = [false, false];
    this.dbljump = false;
    this.deltas = [0, 0];
  }

  physics(floor) {
    this.deltas[0] *= 0.9; // friction

    if (player.pos.y > floor) {
      this.deltas[1] -= 1.5; // gravity
    } else {
      this.deltas[1] = 0; // can't go thru floor lmfao
    }

  }

  move() {
    this.pos[0] += this.deltas[0];
    this.pos[1] += this.deltas[1];
  }

};
