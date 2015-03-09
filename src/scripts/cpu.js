'use strict';

MAG.mag8.CPU = function(){

    // 16-Bit program counter
    var pc = null;

    // 16 x 16-Bit stack
    var stack = new Uint16Array(0x10);

    // stack pointer
    var sp = null;

    // define sixteen Vx (0-F) general purpose 8-Bit registers, last is used for 'carry-flag'
    var v = new Uint8Array(0x10);

    // 16-Bit register, mainly used to store memory addresses
    var i = null;

    // special 8-Bit registers, automatically decremented at 60hz if non-zero
    var delayTimer = null;
    var soundTimer = null;

    var reset = function(){

    };

    return {
        reset: reset
    }

};