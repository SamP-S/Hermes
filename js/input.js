// Relevant Keys -> w,a,s,d,up,down,left,right,escape
var KEY = {
  KEY_DOWN: true,
  KEY_UP: false
}
// Keyboard class for managing user input
class Keyboard {
  constructor() {
    document.addEventListener('keydown', this.KeyDown);
    document.addEventListener('keyup', this.KeyUp);
    this.data[5] = { false, false, false, false, false };
  }

  KeyDown(event) {
    SetKeyState(event.keyCode, KEY_DOWN);
  }

  KeyUp(event) {
    SetKeyState(event.keyCode, KEY_UP);
  }

  SetKeyState(keyCode, state) {
    switch(keyCode) {
      // wasd
      case 87: // W
        this.data[0] = state;
      case 65: // A
        this.data[1] = state;
      case 83: // S
        this.data[2] = state;
      case 68: // D
        this.data[3] = state;

      // Arrow Keys
      case 38: // Up Arrow
        this.data[0] = state;
      case 37: // Left Arrow
        this.data[1] = state;
      case 40: // Down Arrow
        this.data[2] = state;
      case 39: // Right Arrow
        this.data[3] = state;

      // Escape
      case 27: // Escape
        this.data[4] = state;
    }
  }

  GetKeyState(key) {
    let keyCode = key.charCodeAt(0);
    switch(keyCode) {
      // wasd
      case 87: // W
        return this.data[0];
      case 65: // A
        return this.data[1];
      case 83: // S
        return this.data[2];
      case 68: // D
        return this.data[3];

      // Arrow Keys
      case 38: // Up Arrow
        return this.data[0];
      case 37: // Left Arrow
        return this.data[1];
      case 40: // Down Arrow
        return this.data[2];
      case 39: // Right Arrow
        return this.data[3];

      // Escape
      case 27: // Escape
        return this.data[4];
  }
}
