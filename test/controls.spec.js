describe('MAG8 controls:', function() {

    var controls;

    beforeEach(function () {
        controls = MAG.mag8.Controls();
    });

    describe('interface', function() {
        it('should define a reset method', function () {
            expect(controls.reset).toBeDefined();
            expect(typeof controls.reset).toEqual('function');
        });

        it('should define a keyPressed method', function () {
            expect(controls.keyPressed).toBeDefined();
            expect(typeof controls.keyPressed).toEqual('function');
        });

        it('should define a keyReleased method', function () {
            expect(controls.keyReleased).toBeDefined();
            expect(typeof controls.keyReleased).toEqual('function');
        });

        it('should define a isPressed method', function () {
            expect(controls.isPressed).toBeDefined();
            expect(typeof controls.isPressed).toEqual('function');
        });
    });
});