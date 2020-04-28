class Player extends Base_Sprite {
  // N.B. dimensions no longer necessary param. Left in to prevent logic error from brewing but can be removed
  constructor(dimensions=[5, 5], start_pos = [20, 20], g_eng = null){
    if (!g_eng) {alert("no graphics engine to player");}
    let wind_w = g_eng.renderer.domElement.width;
    dimensions = [wind_w*0.005, wind_w*0.005];
    let max_d = [wind_w*0.3, wind_w*0.3];
    super(dimensions, start_pos, "sprite_player", COLOURS.WHITE, 3,
         {health: {time: 0, time_lim: 10^10, state: "vibin"}, jumping: false, dbljump: false}, 80, 0, max_d);
    this.distance = 0.00;
    this.wind_h = g_eng.renderer.domElement.height;
  }

  check_dead() {
    if (this.pos.y > this.wind_h) {
      this.lives = 0;
    }
    if (this.lives == 0) {
      alert("Bruh you got dedded");
      // gameover
    }
  }

  hit() {
    this.lives -= 1;
    this.states.health.time     = 0;
    this.states.health.time_lim = 1.2;
    this.states.health.state    = "hurtin";

    this.check_dead();
  }

  physics() {
    super.physics();
    if (this.deltas.dy == 0) this.states.jumping = false;   // TODO there's a very low chance of jumping being set to false mid jumping
  }

  collided(object, object_offset){
    if (this.getLeft() < object.getRight() + object_offset.x &&
        this.getRight() > object.getLeft() + object_offset.x &&
        this.getTop() < object.getBottom() + object_offset.y &&
        this.getBottom() > object.getTop() + object_offset.y) {
          if (this.states.health.state == "vibin" && object.isTrap) {
            this.hit();
          }
          return true;
    } else {
        return false;
      }
  }

  move(time=0.1, all_objects=[], object_offsets=[ {x:0, y:0}] ) {

    this.physics()

    this.check_max_speeds();

    //this.pos.x += this.deltas.dx * time;    // this line is commented because stage moves horizontally ratehr than player

    if (!this.legal_move(all_objects, object_offsets)){
      this.pos.x -= this.deltas.dx * time;
      this.distance -= this.deltas.dx * time;
      this.deltas.dx = 0;
    }

    this.pos.y += this.deltas.dy * time;

    if (!this.legal_move(all_objects, object_offsets)){
      this.pos.y -= this.deltas.dy * time;
      this.deltas.dy *= 0.5;
      if (this.deltas.dy > 0) this.states.jumping = false;
    }

  }

  u_health(time=0.1) {
    this.states.health.time += time;
    if (this.states.health.time >= this.states.health.time_lim) {
      this.states.health.time     = 0;
      this.states.health.time_lim = 10^10;
      this.states.health.state    = "vibin";
    }
    document.getElementById('lives').innerHTML = `<p> Lives: ${this.lives}</p>`;
  }

  update(u_time=0.01, u_all_objects=[], u_object_offsets=[ {x:0, y:0}] ) {
    this.move(u_time, u_all_objects, u_object_offsets);
    this.u_health(u_time);
  }

  // update with accurate values later - this is template
  // don't think we need ??
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
      } else {
        this.deltas.dx -= 6;
      }
    }
  };

  // only to be called if collision has been confirmed.
  squished(player) {
      if (player.pos.y > this.pos.y && player.pos.y < this.pos.y + 5){
        return true
      }
  }

};
