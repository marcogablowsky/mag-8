'use strict';

MAG.mag8.CPU = function(memory){

    var mem = memory;
    var registers = MAG.mag8.Registers();
    var timers = MAG.mag8.Timers();

    // 16-Bit program counter
    var pc = null;

    // 16 x 16-Bit stack
    var stack = MAG.mag8.Memory('16-bit',0x10);

    // stack pointer
    var sp = null;

    var reset = function(){
        registers.reset();
        timers.reset();
        stack.reset();
        pc = null;
        sp = null;
    };

    var emulateCycle = function(){

    };

    return {
        reset: reset,
        emulateCycle: emulateCycle
    }

};