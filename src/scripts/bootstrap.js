var canvas = document.getElementById('screen');
var renderer = MAG.mag8.CanvasRenderer(canvas, 64, 32, 12, 12);

var vmDebug = MAG.mag8.Debugger();
var vm = MAG.mag8.VM(renderer, vmDebug);

document.addEventListener("keydown", function(event) {
    vm.keyPressed(event.keyCode);
});
document.addEventListener("keyup", function(event) {
    vm.keyReleased(event.keyCode);
});

xhr = new XMLHttpRequest();
xhr.open("GET", "../roms/PONG", true);
xhr.responseType = "arraybuffer";
xhr.onload = function () {
    vm.loadProgram(new Uint8Array(xhr.response));
};
xhr.send();
