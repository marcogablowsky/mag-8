'use strict';

MAG.mag8.CPU = function (memory,display,controls) {

    var mem = memory;
    var screen = display;
    var input = controls;  // jshint ignore:line

    var opcodeDecoder = MAG.mag8.OpcodeDecoder();
    var registers = MAG.mag8.Registers();
    var timers = MAG.mag8.Timers();

    var stack = MAG.mag8.Memory('16-bit', 0x10);
    var stackPointer = -1;

    var ip = 0x200; //instruction pointer

    var operations = {
        CLS: function(){
            screen.reset();
        },

        RET: function(){
            ip = stack.get(stackPointer--);
        },

        JP: function(args){
            ip = args.address;
        },

        CALL: function(args){
            stack.store(ip,++stackPointer);
            ip = args.address;
        },

        SE: function(args){
            if(registers.getV(args.x) === args.kk){
                ip += 2; // skip one instruction
            }
        },

        SNE: function(args){
            if(registers.getV(args.x) !== args.kk){
                ip += 2; // skip one instruction
            }
        },

        SEV: function(args){
            if(registers.getV(args.x) === registers.getV(args.y)){
                ip += 2; // skip one instruction
            }
        },

        LDxkk: function(args){
            registers.storeV(args.x, args.kk);
        }
    };

    var _handleTimers = function(){
        //TODO: Timer handling on emulation cycle
    };

    var reset = function () {
        registers.reset();
        timers.reset();
        stack.reset();
        ip = 0x200;
        stackPointer = null;
    };

    var emulateCycle = function () {
        // fetch
        var opcode = mem.get(ip) << 8 | mem.get(ip + 1);
        ip += 2;

        //decode
        var operation = opcodeDecoder.decode(opcode);

        //execute
        if (operation && operations[operation.ref]) {
            operations[operation.ref](operation.args);
        } else {
            throw new Error('Undefined CPU operation detected: opcode ' + (opcode).toString(16));
        }

        _handleTimers();
    };

    return {
        reset: reset,
        emulateCycle: emulateCycle
    };
};