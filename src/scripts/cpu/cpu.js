'use strict';

MAG.mag8.CPU = function (memory) {

    var mem = memory;
    var opcodeDecoder = MAG.mag8.OpcodeDecoder();
    var registers = MAG.mag8.Registers();
    var timers = MAG.mag8.Timers();

    var stack = MAG.mag8.Memory('16-bit', 0x10);
    var stackPointer = null;

    var ip = null; //instruction pointer

    var operations = {};

    var reset = function () {
        registers.reset();
        timers.reset();
        stack.reset();
        ip = null;
        stackPointer = null;
    };

    var emulateCycle = function () {
        // fetch
        var opcode = mem.get(ip) << 8 | mem.get(ip + 1);
        ip += 2;

        //decode
        var operation = opcodeDecoder.decode(opcode);

        //execute
        if (operations[operation.ref]) {
            operations[operation.ref](operation.args);
        } else {
            throw new Error('Undefined CPU operation detected: opcode ' + (opcode).toString(16));
        }
    };

    return {
        reset: reset,
        emulateCycle: emulateCycle
    };

};