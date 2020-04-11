var colours = new Colours();

class Player {
  constructor() {
    this.pos = { x: -1, y: -1 };
    this.mass = 80;
    this.dimensions = {width: 20, height: 20};
    this.jumping = [false, false];
    this.dbljump = false;
    this.deltas = { dx: 0, dy: 0};
    this.colour = colours.MAGENTA;
    this.lives = 3
  }

  render() {
    console.log("x: ", this.pos.x, " y: ". this.pos.y);
  }

  physics(floor) {
    this.deltas.dx *= 0.9; // friction

    if (player.pos.y > floor) {
      this.deltas.dy -= 1.5; // gravity
    } else {
      this.deltas.dy = 0; // can't go thru floor lmfao
    }

  }

  move() {
    this.physics()
    this.pos.x += this.deltas.dx;
    this.pos.y += this.deltas.dy;
  }

// only deals with rectangular objects -- implement SAT if need to deal with more complex shapes
  collided(object){
    if (this.pos.x < object.pos.x + object.dimensions.width &&
        this.pos.x + this.dimensions.width > object.pos.x &&
        this.pos.y < object.pos.y + object.dimensions.height &&
        this.pos.y + this.dimensions.height > object.y) {
          return true;
    } else{
      return false;
    }
  }

  check_enemies(enemies){
    enemies.forEach((item, i) => {
      if (collided(item)){
        this.lives -= 1;
      }
    });
  }

// only deals with rectangular objects -- implement SAT if need to deal with more complex shapes
  collided(object){
    if (this.pos.x < object.pos.x + object.dimensions.width &&
        this.pos.x + this.dimensions.width > object.pos.x &&
        this.pos.y < object.pos.y + object.dimensions.height &&
        this.pos.y + this.dimensions.height > object.y) {
          return true;
    } else{
      return false;
    }
  }

  check_enemies(enemies){
    enemies.forEach((item, i) => {
      if collided(item){
        this.lives -= 1;
      }
    });
  }

};
