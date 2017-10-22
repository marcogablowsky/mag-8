'use strict';

MAG.mag8.Display = function() {
  var width = 64;
  var height = 32;

  var display = new Array(width * height);

  var _wrap = function(val, maxVal) {
    if (val > maxVal) {
      val -= maxVal;
    } else if (val < 0) {
      val += maxVal;
    }
    return val;
  };

  var reset = function() {
    for (var i = 0; i < display.length; i++) {
      display[i] = 0;
    }
  };

  var setPixel = function(x, y) {
    _wrap(x, width);
    _wrap(y, height);

    display[y * width + x] ^= 1;
    return !display[y * width + x];
  };

  var getPixel = function(index) {
    return display[index];
  };

  reset();

  return {
    setPixel: setPixel,
    getPixel: getPixel,
    reset: reset
  };
};
