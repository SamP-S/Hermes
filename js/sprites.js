class Player extends Base_Sprite {
  constructor(dimensions=[10, 25], start_pos = [20, 400]){
    super(dimensions, start_pos, "sprite_player", COLOURS.MAGENTA, 3,
         {health: {time: 0, timeLim: 10^10, state: "vibin"}, dbljump: false}, 80);
  }

  hit() {
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

  // update with accurate values later - this is template
  check_row(){
    if (this.pos.y > 400){
      this.row = 0;
    } else if (this.pos.y > 200) {
      this.row = 1;
    } else {
      this.row = 2;
    }
    super.move();
  }

};

class Ogre extends Base_Sprite {
  constructor(dimensions=[10, 25], start_pos = [20, 400]){
    super(dimensions, start_pos, "sprite_player", COLOURS.MAGENTA, 3,
         {stunned: false}, 80 );
  }

  move(player) {
    if (this.row == player.row) {
      if (this.pos.x < player.pos.x) {
        this.deltas.dx += 6;
      else {
        this.deltas.dx -= 6;
      }
      }
    }
  };

};
