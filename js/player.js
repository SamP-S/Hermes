var colours = new Colours();

class Player {
  constructor() {
    this.pos = { x: -1, y: -1 };
    this.mass = 80;
    this.dimensions = {width: 20, height: 20};
    this.jumping = [false, false];
    this.deltas = { dx: 0, dy: 0};
    this.colour = colours.MAGENTA;
    this.lives = 3;
    this.states = {health: {time: 0, timeLim: 10^10, state: "vibin"}, dbljump: false};
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

// move routine. Requires array of all other objects.
  move(floor, all_objects) {

    this.physics(floor)
    this.pos.x += this.deltas.dx;
    if (!legal_move(all_objects)){
      this.pos.x -= this.deltas.dx;
      this.deltas.dx; = 0
    }
    this.pos.y += this.deltas.dy;
    if (!legal_move(all_objects)){
      this.pos.y -= this.deltas.dy;
      this.deltas.dy = 0;
    }
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

// checks no collision occurs as result of move
  legal_move(objects){
    objects.forEach((item, i) => {
      if (collided(item)){
        return false
      }
    });
    return true
  }

// change health state to hit for 2000 ms
  hit(){
    this.states.health.time    = 0;
    this.states.health.timeLim = 2000;
    this.states.health.state   = "hurtin";

  }

// checks if have collided with enemy and docks a life if has
  check_enemies(enemies){
    var health_state = this.states.health.state
    if (health_state == "hurtin" || health_state == "invincible") {
      return
    }

    enemies.forEach((item, i) => {
      if (collided(item)){
        this.lives -= 1;
        this.hit();
        item.kill();
      }
    });

  }

};
