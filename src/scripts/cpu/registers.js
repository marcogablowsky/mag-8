'use strict';

MAG.mag8.Registers = function(){

    // define sixteen Vx (0-F) general purpose 8-Bit registers, last is used for 'carry-flag'
    var v = MAG.mag8.Memory('8-bit',0x10);

    // 16-Bit register, mainly used to store memory addresses
    var i = null;

    var reset = function(){
        i = null;
        v.reset();
    };

    var storeV = function(reg, value){
        v.store(value,reg);
    };

    var getV = function(reg){
        return v.get(reg);
    };

    var storeI = function(value){
        if(value < 0 || value > 0xffff){
            throw new Error('Illegal value '+value);
        }
        i = value;
    };

    var getI = function(){
        return i;
    };

    return{
        storeV: storeV,
        getV: getV,
        storeI: storeI,
        getI: getI,
        reset: reset
    }
};