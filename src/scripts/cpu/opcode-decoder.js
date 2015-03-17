'use strict';

MAG.mag8.OpcodeDecoder = function(){

    var _addressArgs = function(opcode){
        return {address: opcode & 0x0FFF};
    };

    var _xkkArgs = function(opcode){
        return {x: (opcode & 0x0F00) >> 8, kk: opcode & 0x00FF};
    };

    var _xArgs = function(opcode){
        return {x: (opcode & 0x0F00) >> 8};
    };

    var _xyArgs = function(opcode){
        var obj = _xArgs(opcode);
        obj.y = (opcode & 0x00F0) >> 4;
        return obj;
    };

    var _xynArgs = function(opcode){
        var obj = _xyArgs(opcode);
        obj.n = (opcode & 0x000F);
        return obj;
    };

    var _decode0xxx = function(opcode){
        switch(opcode){
            case 0x00E0: return {ref: 'CLS'};
            case 0x00EE: return {ref: 'RET'};
        }
    };

    var _decode8xxx = function(opcode){
        switch(opcode & 0x000f){
            case 0x0: return {ref: 'LDxy', args: _xyArgs(opcode)};
            case 0x1: return {ref: 'ORxy', args: _xyArgs(opcode)};
            case 0x2: return {ref: 'ANDxy', args: _xyArgs(opcode)};
            case 0x3: return {ref: 'XORxy', args: _xyArgs(opcode)};
            case 0x4: return {ref: 'ADDxy', args: _xyArgs(opcode)};
            case 0x5: return {ref: 'SUBxy', args: _xyArgs(opcode)};
            case 0x6: return {ref: 'SHRxy', args: _xyArgs(opcode)};
            case 0x7: return {ref: 'SUBNxy', args: _xyArgs(opcode)};
            case 0xE: return {ref: 'SHLxy', args: _xyArgs(opcode)};
        }
    };

    var _decodeExxx = function(opcode){
        switch(opcode & 0x00ff){
            case 0x009E: return {ref: 'SKPx', args: _xArgs(opcode)};
            case 0x00A1: return {ref: 'SKNPx', args: _xArgs(opcode)};
        }
    };

    var _decodeFxxx = function(opcode){
        switch(opcode & 0x00ff){
            case 0x0007: return {ref: 'LDxDt', args: _xArgs(opcode)};
            case 0x000A: return {ref: 'LDxK', args: _xArgs(opcode)};
            case 0x0015: return {ref: 'LDDtx', args: _xArgs(opcode)};
            case 0x0018: return {ref: 'LDStx', args: _xArgs(opcode)};
            case 0x001E: return {ref: 'ADDix', args: _xArgs(opcode)};
            case 0x0029: return {ref: 'LDFx', args: _xArgs(opcode)};
            case 0x0033: return {ref: 'LDBx', args: _xArgs(opcode)};
            case 0x0055: return {ref: 'LDIx', args: _xArgs(opcode)};
            case 0x0065: return {ref: 'LDxI', args: _xArgs(opcode)};
        }
    };

    var decode = function(opcode){
        switch(opcode & 0xf000){
            case 0x0000: return _decode0xxx(opcode);
            case 0x1000: return {ref: 'JP', args: _addressArgs(opcode)};
            case 0x2000: return {ref: 'CALL', args: _addressArgs(opcode)};
            case 0x3000: return {ref: 'SExkk', args: _xkkArgs(opcode)};
            case 0x4000: return {ref: 'SNExkk', args: _xkkArgs(opcode)};
            case 0x5000: return {ref: 'SExy', args: _xyArgs(opcode)};
            case 0x6000: return {ref: 'LDxkk', args: _xkkArgs(opcode)};
            case 0x7000: return {ref: 'ADDxkk', args: _xkkArgs(opcode)};
            case 0x8000: return _decode8xxx(opcode);
            case 0x9000: return {ref: 'SNExy', args: _xyArgs(opcode)};
            case 0xA000: return {ref: 'LD', args: _addressArgs(opcode)};
            case 0xB000: return {ref: 'JPv0', args: _addressArgs(opcode)};
            case 0xC000: return {ref: 'RNDxkk', args: _xkkArgs(opcode)};
            case 0xD000: return {ref: 'DRWxyn', args: _xynArgs(opcode)};
            case 0xE000: return _decodeExxx(opcode);
            case 0xF000: return _decodeFxxx(opcode);
        }
    };

    return {
        decode: decode
    };
};