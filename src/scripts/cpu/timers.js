'use strict';

MAG.mag8.Timers = function(){

    // special 8-Bit registers, automatically decremented at 60hz if non-zero
    var delayTimer = 0;
    var soundTimer = 0;

    var reset = function(){
        delayTimer = 0;
        soundTimer = 0;
    };

    var tick = function(){
        if(delayTimer > 0){
            delayTimer--;
        }
        if(soundTimer > 0){
            soundTimer--;
        }
    };

    var setDelay = function(val){
        if(val < 0 || val > 0xff){
            throw new Error('Invalid delay timer value, must be unsigned 8 bit');
        }
        delayTimer = val;
    };

    var getDelay = function(){
        return delayTimer;
    };

    var setSound = function(val){
        if(val < 0 || val > 0xff){
            throw new Error('Invalid sound timer value, must be unsigned 8 bit');
        }
        soundTimer = val;
    };

    var getSound = function(){
        return soundTimer;
    };

    return {
        reset: reset,
        tick: tick,
        getDelay: getDelay,
        setDelay: setDelay,
        getSound: getSound,
        setSound: setSound
    };
};