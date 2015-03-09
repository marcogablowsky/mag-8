'use strict';

MAG.mag8.Memory = function(){

    /* 4k Main memory
     Memory Map:
     +---------------+= 0xFFF (4095) End of Chip-8 RAM
     |               |
     |               |
     |               |
     |               |
     |               |
     | 0x200 to 0xFFF|
     |     Chip-8    |
     | Program / Data|
     |     Space     |
     |               |
     |               |
     |               |
     +- - - - - - - -+= 0x600 (1536) Start of ETI 660 Chip-8 programs
     |               |
     |               |
     |               |
     +---------------+= 0x200 (512) Start of most Chip-8 programs
     | 0x000 to 0x1FF|
     | Reserved for  |
     |  interpreter  |
     +---------------+= 0x000 (0) Start of Chip-8 RAM

     Taken from http://devernay.free.fr/hacks/chip8/C8TECH10.HTM
     */

    var mem = new Uint8Array(0x1000);
    var maxValue = 0xff;

    var reset = function(){
        for(var i = 0; i < mem.length; i++){
            mem[i] = 0;
        }
    };

    var _checkAddress = function(address){
        if(address < 0 || address >= mem.length){
            throw new Error('Invalid address '+address);
        }
    };

    var _checkValue = function(value){
        if(value < 0 || value > maxValue){
            throw new Error('Invalid value '+value);
        }
    };

    var store = function(value, address){
        _checkAddress(address);
        _checkValue(value);
        mem[address] = value;
    };

    var get = function(address){
        _checkAddress(address);
        return mem[address];
    };

    return {
        reset: reset,
        store: store,
        get: get
    };

};