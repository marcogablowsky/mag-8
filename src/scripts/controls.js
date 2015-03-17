'use strict';

MAG.mag8.Controls = function(){

    var keystates = new Array(0x10);

    var _checkInput = function(keycode){
        if(keycode < 0x0 || keycode > 0xf){
            throw new Error('Invalid keycode '+keycode+ '. Must be 0-15');
        }
    };

    var reset = function(){
        for(var i=0; i < keystates.length; i++){
            keystates[i] = false;
        }
    };

    var keyPressed = function(keycode){
        _checkInput(keycode);
        keystates[keycode] = true;
    };

    var keyReleased = function(keycode){
        _checkInput(keycode);
        keystates[keycode] = false;
    };

    var isPressed = function(keycode){
        _checkInput(keycode);
        return keystates[keycode];
    };

    return {
        reset: reset,
        keyPressed: keyPressed,
        keyReleased: keyReleased,
        isPressed: isPressed
    };
};
