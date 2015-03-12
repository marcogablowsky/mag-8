'use strict';

MAG.mag8.Timers = function(){

    // special 8-Bit registers, automatically decremented at 60hz if non-zero
    var delayTimer = 0;
    var soundTimer = 0;

    var reset = function(){
        delayTimer = 0;
        soundTimer = 0;
    };

    return {
        reset: reset
    };
};