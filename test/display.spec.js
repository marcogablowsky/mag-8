describe('MAG8 display:', function() {

    var display;

    beforeEach(function () {
        display = new MAG.mag8.Display;
    });

    describe('interface', function() {
        it('should define a setPixel method', function () {
            expect(display.setPixel).toBeDefined();
            expect(typeof display.setPixel).toEqual('function');
        });

        it('should define a reset method', function () {
            expect(display.reset).toBeDefined();
            expect(typeof display.reset).toEqual('function');
        });
    });
});
