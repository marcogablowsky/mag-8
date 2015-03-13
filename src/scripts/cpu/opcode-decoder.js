'use strict';

MAG.mag8.OpcodeDecoder = function(){

    var _decode0xxx = function(opcode){
        switch(opcode){
            case 0x00E0: return {ref: 'CLS'};
            case 0x00EE: return {ref: 'RET'};
        }
    };

    var decode = function(opcode){
        switch(opcode & 0xf000){
            case 0x0000:
                return _decode0xxx(opcode);

            case 0x1000:
                return {ref: 'JP', args: {address: opcode & 0x0FFF}};

            case 0x2000:
                return {ref: 'CALL', args: {address: opcode & 0x0FFF}};

            case 0x3000:
                // Skip next instruction if Vx equals kk
                return {ref: 'SE', args: {x: (opcode & 0x0F00) >> 8, kk: opcode & 0x00FF}}

            case 0x4000:
                // Skip next instruction if Vx not equals kk
                return {ref: 'SNE', args: {x: (opcode & 0x0F00) >> 8, kk: opcode & 0x00FF}}

            case 0x5000:
                // Skip next instruction if Vx equals Vy
                return {ref: 'SEV', args: {x: (opcode & 0x0F00) >> 8, y: (opcode & 0x00F0) >> 4}}
        }
    };

    return {
        decode: decode
    }
};

