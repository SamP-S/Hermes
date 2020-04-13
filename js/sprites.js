class Player extends Base_Sprite {
  constructor(dimensions=[10, 25], start_pos = [20, 400]){
    super(dimensions, start_pos, "sprite_player", COLOURS.MAGENTA, 3,
         {health: {time: 0, timeLim: 10^10, state: "vibin"}, dbljump: false} );
  }
};
