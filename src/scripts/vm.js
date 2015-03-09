'use strict';

MAG.mag8.VM = (function() {

    var cpu = MAG.mag8.CPU();
    var memory = MAG.mag8.Memory();
    var display = MAG.mag8.Display();

    var running = false;

    var _initMemory = function(){
        for(var i = 0; i < MAG.mag8.Constants.hexChars.length; i++){
            memory.store(i,MAG.mag8.Constants.hexChars[i]);
        };
    };

    var reset = function(){
        running = false;
        cpu.reset();
        memory.reset();
        _initMemory();
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

    // initialize memory on creation
    _initMemory();

    return {
        reset: reset,
        start: start,
        stop: stop,
        isRunning: isRunning
    };

})();