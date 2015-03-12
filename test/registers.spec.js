describe('MAG8 registers:', function() {

    var regs;

    beforeEach(function () {
        regs = MAG.mag8.Registers();
    });

    describe('interface', function () {
        it('should define a reset method', function () {
            expect(regs.reset).toBeDefined();
            expect(typeof regs.reset).toEqual('function');
        });

        it('should define a storeV method', function () {
            expect(regs.storeV).toBeDefined();
            expect(typeof regs.storeV).toEqual('function');
        });

        it('should define a getV method', function () {
            expect(regs.getV).toBeDefined();
            expect(typeof regs.getV).toEqual('function');
        });

        it('should define a storeI method', function () {
            expect(regs.storeI).toBeDefined();
            expect(typeof regs.storeI).toEqual('function');
        });

        it('should define a getI method', function () {
            expect(regs.getI).toBeDefined();
            expect(typeof regs.getI).toEqual('function');
        });
    });
});