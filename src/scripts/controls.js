'use strict';

MAG.mag8.Controls = function() {
  var keystates = new Array(0x10);

  var _keyMap = {
    49: 0x1, // 1
    50: 0x2, // 2
    51: 0x3, // 3
    52: 0xc, // 4
    81: 0x4, // Q
    87: 0x5, // W
    69: 0x6, // E
    82: 0xd, // R
    65: 0x7, // A
    83: 0x8, // S
    68: 0x9, // D
    70: 0xe, // F
    90: 0xa, // Z
    88: 0x0, // X
    67: 0xb, // C
    86: 0xf // V
  };

  var _checkInput = function(keycode) {
    if (keycode < 0x0 || keycode > 0xf) {
      throw new Error('Invalid keycode ' + keycode + '. Must be 0-15');
    }
  };

  var reset = function() {
    for (var i = 0; i < keystates.length; i++) {
      keystates[i] = false;
    }
  };

  var keyPressed = function(keycode) {
    var key = _keyMap[keycode];
    _checkInput(key);
    keystates[key] = true;
  };

  var keyReleased = function(keycode) {
    var key = _keyMap[keycode];
    _checkInput(key);
    keystates[key] = false;
  };

  var isPressed = function(keycode) {
    _checkInput(keycode);
    return keystates[keycode];
  };

  return {
    reset: reset,
    keyPressed: keyPressed,
    keyReleased: keyReleased,
    isPressed: isPressed
  };
};
