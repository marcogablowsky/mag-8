'use strict';

MAG.mag8.Display = function() {
    var width = 64;
    var height = 32;

    var display = new Array(width * height);

    var reset = function(){
        for(var i=0; i < display.length; i++){
            display[i] = false;
        }
    };

    var draw = function(){

    };

    return {
        draw: draw,
        reset: reset
    };
};