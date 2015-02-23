'use strict';

MAG.mag8.VM = (function() {

    var cpu = MAG.mag8.CPU();
    var memory = MAG.mag8.Memory();

    var running = false;

    var reset = function(){
        cpu.reset();
        memory.reset();
    };

    var start = function(){
        running = true;
    };

    var stop = function(){
        running = false;
    };

    return {
        reset: reset,
        start: start,
        stop: stop
    };

})();