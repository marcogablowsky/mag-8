'use strict';

MAG.mag8.Debugger = function() {
  var memory, screen;

  var setObjects = function(mem, display) {
    memory = mem;
    screen = display;
  };

  var memDump = function() {
    var hexDump = new Array(0x1000);
    for (var i = 0; i < 0x1000; i++) {
      hexDump[i] = memory.get(i).toString(16);
    }
    console.log(hexDump);
  };

  return {
    setObjects: setObjects,
    memDump: memDump
  };
};
