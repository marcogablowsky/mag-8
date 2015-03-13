describe('MAG8 opcode decoder:', function() {

    var decoder;

    beforeEach(function () {
        decoder = MAG.mag8.OpcodeDecoder();
    });

    describe('interface', function() {
        it('should define a decode method', function () {
            expect(decoder.decode).toBeDefined();
            expect(typeof decoder.decode).toEqual('function');
        });
    });

    describe('behaviour', function() {
        it('should decode 0x00E0 to CLS without arguments', function(){
            var op = decoder.decode(0x00E0);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('CLS');
            expect(op.args).toBeUndefined();
        });

        it('should decode 0x00EE to RET without arguments', function(){
            var op = decoder.decode(0x00EE);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('RET');
            expect(op.args).toBeUndefined();
        });

        it('should decode 0x1nnn to JP with nnn as address argument', function(){
            var op = decoder.decode(0x1123);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('JP');
            expect(op.args).toBeDefined();
            expect(op.args.address).toBeDefined();
            expect(op.args.address).toEqual(0x123);
        });

        it('should decode 0x2nnn to CALL with nnn as address argument', function(){
            var op = decoder.decode(0x2fff);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('CALL');
            expect(op.args).toBeDefined();
            expect(op.args.address).toBeDefined();
            expect(op.args.address).toEqual(0xfff);
        });
    });
});