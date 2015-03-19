'use strict';

MAG.mag8.VM = function(debug) {

    var memory = MAG.mag8.Memory('8-bit',0x1000);
    var display = MAG.mag8.Display();
    var controls = MAG.mag8.Controls();
    var cpu = MAG.mag8.CPU(memory,display,controls);

    var running = false;

    if(debug){
        debug.setObjects(memory,display);
    }

    var _initMemory = function(){
        for(var i = 0; i < MAG.mag8.Constants.hexChars.length; i++){
            memory.store(i,MAG.mag8.Constants.hexChars[i]);
        }
    };

    var reset = function(){
        running = false;
        cpu.reset();
        memory.reset();
        display.reset();
        _initMemory();
    };

    var step = function(){
        cpu.emulateCycle();
    };

    var start = function(){
        running = true;
    };

    var stop = function(){
        running = false;
    };

    var isRunning = function(){
        return running;
    };

    var loadProgram = function (program) {
        for (var i = 0; i < program.length; i++) {
            memory.store(program[i],0x200 + i);
        }
    };

    // initialize memory on creation
    _initMemory();

    return {
        reset: reset,
        step: step,
        start: start,
        stop: stop,
        isRunning: isRunning,
        loadProgram: loadProgram
    };

};