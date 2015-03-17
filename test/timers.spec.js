describe('MAG8 timers:', function() {

    var timers;

    beforeEach(function () {
        timers = MAG.mag8.Timers();
    });

    describe('interface', function() {
        it('should define a reset method', function () {
            expect(timers.reset).toBeDefined();
            expect(typeof timers.reset).toEqual('function');
        });

        it('should define a tick method', function () {
            expect(timers.tick).toBeDefined();
            expect(typeof timers.tick).toEqual('function');
        });

        it('should define a getDelay method', function () {
            expect(timers.getDelay).toBeDefined();
            expect(typeof timers.getDelay).toEqual('function');
        });

        it('should define a setDelay method', function () {
            expect(timers.setDelay).toBeDefined();
            expect(typeof timers.setDelay).toEqual('function');
        });

        it('should define a getSound method', function () {
            expect(timers.getSound).toBeDefined();
            expect(typeof timers.getSound).toEqual('function');
        });

        it('should define a setSound method', function () {
            expect(timers.setSound).toBeDefined();
            expect(typeof timers.setSound).toEqual('function');
        });
    });

});
