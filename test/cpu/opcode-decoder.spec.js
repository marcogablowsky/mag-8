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

        it('should decode 0x3xkk to SExkk with x and kk arguments', function(){
            var op = decoder.decode(0x3aff);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('SExkk');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xa);
            expect(op.args.kk).toBeDefined();
            expect(op.args.kk).toEqual(0xff);
        });

        it('should decode 0x4xkk to SNExkk with x and kk arguments', function(){
            var op = decoder.decode(0x4da9);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('SNExkk');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xd);
            expect(op.args.kk).toBeDefined();
            expect(op.args.kk).toEqual(0xa9);
        });

        it('should decode 0x5xy0 to SExy with x and y arguments', function(){
            var op = decoder.decode(0x5da0);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('SExy');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xd);
            expect(op.args.y).toBeDefined();
            expect(op.args.y).toEqual(0xa);
        });

        it('should decode 0x6xkk to LDxkk with x and kk arguments', function(){
            var op = decoder.decode(0x6a99);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('LDxkk');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xa);
            expect(op.args.kk).toBeDefined();
            expect(op.args.kk).toEqual(0x99);
        });

        it('should decode 0x7xkk to ADDxkk with x and kk arguments', function(){
            var op = decoder.decode(0x7a99);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('ADDxkk');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xa);
            expect(op.args.kk).toBeDefined();
            expect(op.args.kk).toEqual(0x99);
        });

        it('should decode 0x8xy0 to LDxy with x and y arguments', function(){
            var op = decoder.decode(0x8da0);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('LDxy');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xd);
            expect(op.args.y).toBeDefined();
            expect(op.args.y).toEqual(0xa);
        });

        it('should decode 0x8xy1 to ORxy with x and y arguments', function(){
            var op = decoder.decode(0x8da1);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('ORxy');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xd);
            expect(op.args.y).toBeDefined();
            expect(op.args.y).toEqual(0xa);
        });

        it('should decode 0x8xy2 to ANDxy with x and y arguments', function(){
            var op = decoder.decode(0x8da2);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('ANDxy');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xd);
            expect(op.args.y).toBeDefined();
            expect(op.args.y).toEqual(0xa);
        });

        it('should decode 0x8xy3 to XORxy with x and y arguments', function(){
            var op = decoder.decode(0x8da3);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('XORxy');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xd);
            expect(op.args.y).toBeDefined();
            expect(op.args.y).toEqual(0xa);
        });

        it('should decode 0x8xy4 to ADDxy with x and y arguments', function(){
            var op = decoder.decode(0x8da4);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('ADDxy');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xd);
            expect(op.args.y).toBeDefined();
            expect(op.args.y).toEqual(0xa);
        });

        it('should decode 0x8xy5 to SUBxy with x and y arguments', function(){
            var op = decoder.decode(0x8da5);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('SUBxy');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xd);
            expect(op.args.y).toBeDefined();
            expect(op.args.y).toEqual(0xa);
        });

        it('should decode 0x8xy6 to SHRxy with x and y arguments', function(){
            var op = decoder.decode(0x8da6);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('SHRxy');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xd);
            expect(op.args.y).toBeDefined();
            expect(op.args.y).toEqual(0xa);
        });

        it('should decode 0x8xy7 to SUBNxy with x and y arguments', function(){
            var op = decoder.decode(0x8da7);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('SUBNxy');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xd);
            expect(op.args.y).toBeDefined();
            expect(op.args.y).toEqual(0xa);
        });

        it('should decode 0x8xyE to SHLxy with x and y arguments', function(){
            var op = decoder.decode(0x8daE);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('SHLxy');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xd);
            expect(op.args.y).toBeDefined();
            expect(op.args.y).toEqual(0xa);
        });

        it('should decode 0x9xy0 to SNExy with x and y arguments', function(){
            var op = decoder.decode(0x9da0);
            expect(op.ref).toBeDefined();
            expect(op.ref).toEqual('SNExy');
            expect(op.args).toBeDefined();
            expect(op.args.x).toBeDefined();
            expect(op.args.x).toEqual(0xd);
            expect(op.args.y).toBeDefined();
            expect(op.args.y).toEqual(0xa);
        });
    });
});