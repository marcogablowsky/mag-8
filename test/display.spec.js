describe('MAG8 display:', function() {

    var display;

    beforeEach(function () {
        display = new MAG.mag8.Display;
    });

    describe('interface', function() {
        it('should define a draw method', function () {
            expect(display.draw).toBeDefined();
            expect(typeof display.draw).toEqual('function');
        });

        it('should define a reset method', function () {
            expect(display.reset).toBeDefined();
            expect(typeof display.reset).toEqual('function');
        });
    });
});
