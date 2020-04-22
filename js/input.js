//document.addEventListener('mousemove', function (event) { console.log("x:", event.x, "   y:", event.y); } );

// Relevant Keys -> w,a,s,d,up,down,left,right,escape
var KEY = {
  KEY_DOWN: true,
  KEY_UP: false
}

// Keyboard class for managing user input
class Keyboard {
  constructor() {

    this.data = [ false, false, false, false, false ];
  }

  // What was once a bug is now a feature for swtich case uses
  // When no "BREAK" is used the code execution falls through
  // Therefore multiple can use the same code as an effective "OR"

  SetKeyState(keyCode, state) {
    switch(keyCode) {
      case 38: // Up Arrow
      case 87: // W
      case 119: // w
        this.data[0] = state;
        break;

      case 37:  // Left Arrow
      case 65:  // A
      case 97:  // a
        this.data[1] = state;
        break;

      case 40:  // Down Arrow
      case 83:  // S
      case 115: // s
        this.data[2] = state;
        break;

      case 39:  // Right Arrow
      case 68:  // D
      case 100: // d
        this.data[3] = state;
        break;

      // Escape
      case 27:
        this.data[4] = state;
        break;
    }
  }

  GetKeyState(key) {
    let keyCode = key.charCodeAt(0);
    switch(keyCode) {
      case 38: // Up Arrow
      case 87: // W
      case 119: // w
        return this.data[0];

      case 37:  // Left Arrow
      case 65:  // A
      case 97:  // a
        return this.data[1];

      case 40:  // Down Arrow
      case 83:  // S
      case 115: // s
        return this.data[2];

      case 39:  // Right Arrow
      case 68:  // D
      case 100: // d
        return this.data[3];

      // Escape
      case 27:
        return this.data[4];
      }
  }

  KeyDown(event) {
    this.SetKeyState(event.keyCode, KEY.KEY_DOWN);
  }

  KeyUp(event) {
    this.SetKeyState(event.keyCode, KEY.KEY_UP);
  }

}
