class object {
  constructor() {
      this.pos = {x: 0, y:0}; // Top left corner of shape (if rect), otherwise centre.
      this.dimensions = {width: 0, height: 0};
      this.color = 0x455063;
  }

  draw() {
    console.log("Error, base object class cannot be drawn.");
  }



};
