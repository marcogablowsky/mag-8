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

        JPv0: function(args){
            ip = args.address + registers.getV(0x0);
        },

        CALL: function(args){
            stack.store(ip,++stackPointer);
            ip = args.address;
        },

        SExkk: function(args){
            if(registers.getV(args.x) === args.kk){
                ip += 2; // skip one instruction
            }
        },

        SExy: function(args){
            if(registers.getV(args.x) === registers.getV(args.y)){
                ip += 2; // skip one instruction
            }
        },

        SNExkk: function(args){
            if(registers.getV(args.x) !== args.kk){
                ip += 2; // skip one instruction
            }
        },

        SNExy: function(args){
            if(registers.getV(args.x) !== registers.getV(args.y)){
                ip += 2; // skip one instruction
            }
        },

        LD: function(args){
            registers.storeI(args.address);
        },

        LDxkk: function(args){
            registers.storeV(args.x, args.kk);
        },

        LDxy: function(args){
            registers.storeV(args.x, registers.getV(args.y));
        },

        ADDxkk: function(args){
            var newVal = registers.getV(args.x) + args.kk;
            if(newVal > 0xff){
                newVal -= 0x100;
            }
            registers.storeV(args.x, newVal);
        },

        ADDxy: function(args){
            var sum = registers.getV(args.x) + registers.getV(args.y);
            registers.storeV(0xf, +(sum > 0xff)); // carry flag, 0 or 1
            if(sum > 0xff){
                sum -= 0xfff;
            }
            registers.storeV(args.x, sum);
        },

        SUBxy: function(args){
            var diff = registers.getV(args.x) - registers.getV(args.y);
            registers.storeV(0xf, +(registers.getV(args.x) > registers.getV(args.y))); // carry flag, 0 or 1
            if(diff < 0){
                diff += 0xfff;
            }
            registers.storeV(args.x, diff);
        },

        SUBNxy: function(args){
            var diff = registers.getV(args.y) - registers.getV(args.x);
            registers.storeV(0xf, +(registers.getV(args.y) > registers.getV(args.x)));
            if (diff < 0) {
                diff += 0xfff;
            }
            registers.storeV(args.x, diff);
        },

        ORxy: function(args){
            registers.storeV(args.x, registers.getV(args.x) | registers.getV(args.y));
        },

        ANDxy: function(args){
            registers.storeV(args.x, registers.getV(args.x) & registers.getV(args.y));
        },

        XORxy: function(args){
            registers.storeV(args.x, registers.getV(args.x) ^ registers.getV(args.y));
        },

        SHRxy: function(args){
            registers.storeV(0xf, registers.getV(args.x) & 0x1);
            registers.storeV(args.x, registers.getV(args.x) >> 1);
        },

        SHLxy: function(args){
            registers.storeV(0xf, registers.getV(args.x) & 0x80);
            var val = registers.getV(args.x) << 1;
            if(val > 0xff){
                val -= 0xfff;
            }
            registers.storeV(args.x, val);
        },

        RNDxkk: function(args){
            registers.storeV(args.x, Math.floor(Math.random() * 0xFF) & args.kk);
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