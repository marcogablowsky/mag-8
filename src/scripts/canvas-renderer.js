'use strict';

MAG.mag8.CanvasRenderer = function(canvas, width, height, pixelWidth, pixelHeight, fgColor, bgColor){
    var ctx = canvas.getContext("2d");

    var pixWidth = pixelWidth || 10;
    var pixHeight = pixelHeight || 10;
    var onColor = fgColor || "#0f8";
    var offColor = bgColor || "#444";

    var _setDimensions = function(pixWidth,pixHeight) {
        canvas.width = pixWidth * width;
        canvas.height = pixHeight * height;
    };

    var _clear = function () {
        ctx.clearRect(0, 0, width * pixWidth, height * pixHeight);
    };

    var render = function (display) {
        _clear();

        var i, x, y;
        for (i = 0; i < width * height; i++) {
            x = (i % width) * pixWidth;
            y = Math.floor(i / width) * pixHeight;

            ctx.fillStyle = [offColor, onColor][display.getPixel(i)];
            ctx.fillRect(x, y, pixWidth, pixHeight);
        }
    };

    _setDimensions(pixWidth, pixHeight);

    return {
        render: render
    };
};