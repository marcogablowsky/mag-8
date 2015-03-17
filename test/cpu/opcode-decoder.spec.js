describe('MAG8 opcode decoder:', function() {

    var decoder;

    var validateRef = function(obj, ref){
        expect(obj.ref).toBeDefined();
        expect(obj.ref).toEqual(ref);
    };

    var validateAddressArgs = function(obj, addr){
        expect(obj.args).toBeDefined();
        expect(obj.args.address).toBeDefined();
        expect(obj.args.address).toEqual(addr);
    };

    var validateXkkArgs = function(obj, x, kk){
        expect(obj.args).toBeDefined();
        expect(obj.args.x).toBeDefined();
        expect(obj.args.x).toEqual(x);
        expect(obj.args.kk).toBeDefined();
        expect(obj.args.kk).toEqual(kk);
    };

    var validateXArg = function(obj, x){
        expect(obj.args).toBeDefined();
        expect(obj.args.x).toBeDefined();
        expect(obj.args.x).toEqual(x);
    };

    var validateXyArgs = function(obj, x, y){
        validateXArg(obj,x);
        expect(obj.args.y).toBeDefined();
        expect(obj.args.y).toEqual(y);
    };

    var validateXynArgs = function(obj, x, y, n){
        validateXyArgs(obj,x,y);
        expect(obj.args.n).toBeDefined();
        expect(obj.args.n).toEqual(n);
    };

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
            validateRef(op, 'CLS');
            expect(op.args).toBeUndefined();
        });

        it('should decode 0x00EE to RET without arguments', function(){
            var op = decoder.decode(0x00EE);
            validateRef(op, 'RET');
            expect(op.args).toBeUndefined();
        });

        it('should decode 0x1nnn to JP with nnn as address argument', function(){
            var op = decoder.decode(0x1123);
            validateRef(op, 'JP');
            validateAddressArgs(op,0x123);
        });

        it('should decode 0x2nnn to CALL with nnn as address argument', function(){
            var op = decoder.decode(0x2fff);
            validateRef(op, 'CALL');
            validateAddressArgs(op,0xfff);
        });

        it('should decode 0x3xkk to SExkk with x and kk arguments', function(){
            var op = decoder.decode(0x3aff);
            validateRef(op, 'SExkk');
            validateXkkArgs(op,0xa,0xff);
        });

        it('should decode 0x4xkk to SNExkk with x and kk arguments', function(){
            var op = decoder.decode(0x4da9);
            validateRef(op, 'SNExkk');
            validateXkkArgs(op,0xd,0xa9);
        });

        it('should decode 0x5xy0 to SExy with x and y arguments', function(){
            var op = decoder.decode(0x5da0);
            validateRef(op, 'SExy');
            validateXyArgs(op,0xd,0xa);
        });

        it('should decode 0x6xkk to LDxkk with x and kk arguments', function(){
            var op = decoder.decode(0x6a99);
            validateRef(op, 'LDxkk');
            validateXkkArgs(op,0xa,0x99);
        });

        it('should decode 0x7xkk to ADDxkk with x and kk arguments', function(){
            var op = decoder.decode(0x7a99);
            validateRef(op, 'ADDxkk');
            validateXkkArgs(op,0xa,0x99);
        });

        it('should decode 0x8xy0 to LDxy with x and y arguments', function(){
            var op = decoder.decode(0x8da0);
            validateRef(op, 'LDxy');
            validateXyArgs(op,0xd,0xa);
        });

        it('should decode 0x8xy1 to ORxy with x and y arguments', function(){
            var op = decoder.decode(0x8da1);
            validateRef(op, 'ORxy');
            validateXyArgs(op,0xd,0xa);
        });

        it('should decode 0x8xy2 to ANDxy with x and y arguments', function(){
            var op = decoder.decode(0x8da2);
            validateRef(op, 'ANDxy');
            validateXyArgs(op,0xd,0xa);
        });

        it('should decode 0x8xy3 to XORxy with x and y arguments', function(){
            var op = decoder.decode(0x8da3);
            validateRef(op, 'XORxy');
            validateXyArgs(op,0xd,0xa);
        });

        it('should decode 0x8xy4 to ADDxy with x and y arguments', function(){
            var op = decoder.decode(0x8da4);
            validateRef(op, 'ADDxy');
            validateXyArgs(op,0xd,0xa);
        });

        it('should decode 0x8xy5 to SUBxy with x and y arguments', function(){
            var op = decoder.decode(0x8da5);
            validateRef(op, 'SUBxy');
            validateXyArgs(op,0xd,0xa);
        });

        it('should decode 0x8xy6 to SHRxy with x and y arguments', function(){
            var op = decoder.decode(0x8da6);
            validateRef(op, 'SHRxy');
            validateXyArgs(op,0xd,0xa);
        });

        it('should decode 0x8xy7 to SUBNxy with x and y arguments', function(){
            var op = decoder.decode(0x8da7);
            validateRef(op, 'SUBNxy');
            validateXyArgs(op,0xd,0xa);
        });

        it('should decode 0x8xyE to SHLxy with x and y arguments', function(){
            var op = decoder.decode(0x8daE);
            validateRef(op, 'SHLxy');
            validateXyArgs(op,0xd,0xa);
        });

        it('should decode 0x9xy0 to SNExy with x and y arguments', function(){
            var op = decoder.decode(0x9da0);
            validateRef(op, 'SNExy');
            validateXyArgs(op,0xd,0xa);
        });

        it('should decode 0xAnnn to LD with nnn as address argument', function(){
            var op = decoder.decode(0xA123);
            validateRef(op, 'LD');
            validateAddressArgs(op,0x123);
        });

        it('should decode 0xBnnn to JPv0 with nnn as address argument', function(){
            var op = decoder.decode(0xB123);
            validateRef(op, 'JPv0');
            validateAddressArgs(op,0x123);
        });

        it('should decode 0xCxkk to RNDxkk with x and kk arguments', function(){
            var op = decoder.decode(0xCa99);
            validateRef(op, 'RNDxkk');
            validateXkkArgs(op,0xa,0x99);
        });

        it('should decode 0xEx9E to SKPx with x argument', function(){
            var op = decoder.decode(0xE29E);
            validateRef(op, 'SKPx');
            validateXArg(op,0x2);
        });

        it('should decode 0xExA1 to SKNPx with x argument', function(){
            var op = decoder.decode(0xE2A1);
            validateRef(op, 'SKNPx');
            validateXArg(op,0x2);
        });

        it('should decode 0xDxyn to DRWxyn with x,y and n arguments', function(){
            var op = decoder.decode(0xD2A8);
            validateRef(op, 'DRWxyn');
            validateXynArgs(op,0x2, 0xa, 0x8);
        });

        it('should decode 0xFx07 to LDxDt with x argument', function(){
            var op = decoder.decode(0xF207);
            validateRef(op, 'LDxDt');
            validateXArg(op,0x2);
        });

        it('should decode 0xFx0A to LDxK with x argument', function(){
            var op = decoder.decode(0xF20A);
            validateRef(op, 'LDxK');
            validateXArg(op,0x2);
        });

        it('should decode 0xFx15 to LDDtx with x argument', function(){
            var op = decoder.decode(0xF215);
            validateRef(op, 'LDDtx');
            validateXArg(op,0x2);
        });

        it('should decode 0xFx18 to LDStx with x argument', function(){
            var op = decoder.decode(0xF218);
            validateRef(op, 'LDStx');
            validateXArg(op,0x2);
        });

        it('should decode 0xFx1E to ADDix with x argument', function(){
            var op = decoder.decode(0xF21E);
            validateRef(op, 'ADDix');
            validateXArg(op,0x2);
        });

        it('should decode 0xFx29 to LDFx with x argument', function(){
            var op = decoder.decode(0xF229);
            validateRef(op, 'LDFx');
            validateXArg(op,0x2);
        });

        it('should decode 0xFx33 to LDBx with x argument', function(){
            var op = decoder.decode(0xF233);
            validateRef(op, 'LDBx');
            validateXArg(op,0x2);
        });

        it('should decode 0xFx55 to LDIx with x argument', function(){
            var op = decoder.decode(0xF255);
            validateRef(op, 'LDIx');
            validateXArg(op,0x2);
        });

        it('should decode 0xFx65 to LDxI with x argument', function(){
            var op = decoder.decode(0xF265);
            validateRef(op, 'LDxI');
            validateXArg(op,0x2);
        });
    });
});