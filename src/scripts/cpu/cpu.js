'use strict';

MAG.mag8.CPU = function (memory) {

    var mem = memory;
    var registers = MAG.mag8.Registers();
    var timers = MAG.mag8.Timers();

    var stack = MAG.mag8.Memory('16-bit', 0x10);
    var stackPointer = null;

    var ip = null; //instruction pointer

    var reset = function () {
        registers.reset();
        timers.reset();
        stack.reset();
        ip = null;
        stackPointer = null;
    };

    var emulateCycle = function () {

    };

    return {
        reset: reset,
        emulateCycle: emulateCycle
    };

};