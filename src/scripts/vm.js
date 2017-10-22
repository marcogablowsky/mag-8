'use strict';

MAG.mag8.VM = function(renderer, debug) {
  var memory = MAG.mag8.Memory('8-bit', 0x1000);
  var display = MAG.mag8.Display();
  var controls = MAG.mag8.Controls();
  var cpu = MAG.mag8.CPU(memory, display, controls);

  // basic clock is at 60Hz -> through requestAnimationFrame
  var multiplier = 29; // -> 1.74 MhZ

  var running = false;

  if (debug) {
    debug.setObjects(memory, display);
  }

  var _initMemory = function() {
    for (var i = 0; i < MAG.mag8.Constants.hexChars.length; i++) {
      memory.store(MAG.mag8.Constants.hexChars[i], i);
    }
  };

  var _render = function(display) {
    if (renderer) {
      renderer.render(display);
    }
  };

  var _loop = function(cb) {
    var _cb = function() {
      cb();
      requestAnimationFrame(_cb);
    };
    _cb();
  };

  var _runInternal = function() {
    if (running) {
      for (var i = 0; i < multiplier; i++) {
        cpu.emulateCycle();
      }
      _render(display);
      cpu.handleTimers();
    }
  };

  var reset = function() {
    running = false;
    cpu.reset();
    memory.reset();
    display.reset();
    _initMemory();
    _render(display);
  };

  var resetCpuOnly = function() {
    cpu.reset();
  };

  var step = function() {
    cpu.emulateCycle();
    _render(display);
  };

  var start = function() {
    running = true;
  };

  var stop = function() {
    running = false;
  };

  var isRunning = function() {
    return running;
  };

  var loadProgram = function(program) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'roms/' + program, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
      var prog = new Uint8Array(xhr.response);
      for (var i = 0; i < prog.length; i++) {
        memory.store(prog[i], 0x200 + i);
      }
    };
    xhr.send();
  };

  var clockMultiplier = function(factor) {
    if (factor) {
      multiplier = factor;
      console.log('Multiplier at: ' + multiplier);
    }
    return multiplier;
  };

  var keyPressed = function(key) {
    controls.keyPressed(key);
  };

  var keyReleased = function(key) {
    controls.keyReleased(key);
  };

  document.addEventListener('keydown', function(event) {
    keyPressed(event.keyCode);
  });
  document.addEventListener('keyup', function(event) {
    keyReleased(event.keyCode);
  });

  // initialize memory on creation
  _initMemory();
  _render(display);

  //kick off the main loop
  _loop(_runInternal);

  return {
    reset: reset,
    resetCpuOnly: resetCpuOnly,
    step: step,
    start: start,
    stop: stop,
    isRunning: isRunning,
    loadProgram: loadProgram,
    clockMultiplier: clockMultiplier
  };
};
