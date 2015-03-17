describe('MAG8 virtual machine:', function() {

    var vm;

    beforeEach(function () {
        vm = MAG.mag8.VM();
    });

    describe('interface', function() {
        it('should define a reset method', function () {
            expect(vm.reset).toBeDefined();
            expect(typeof vm.reset).toEqual('function');
        });

        it('should define a step method', function () {
            expect(vm.step).toBeDefined();
            expect(typeof vm.step).toEqual('function');
        });

        it('should define a start method', function () {
            expect(vm.start).toBeDefined();
            expect(typeof vm.start).toEqual('function');
        });

        it('should define a stop method', function () {
            expect(vm.stop).toBeDefined();
            expect(typeof vm.stop).toEqual('function');
        });

        it('should define an isRunning method', function () {
            expect(vm.isRunning).toBeDefined();
            expect(typeof vm.isRunning).toEqual('function');
        });
    });

    describe('behaviour', function() {
        it('should not be running right after creation',function(){
            expect(vm.isRunning()).toBeFalsy();
        });

        it('should switch states through start / stop calls', function(){
            vm.start();
            expect(vm.isRunning()).toBeTruthy();
            vm.stop();
            expect(vm.isRunning()).toBeFalsy();
        });

        it('should not be running after a reset call', function(){
            vm.start();
            vm.reset();
            expect(vm.isRunning()).toBeFalsy();
        });
    });
});