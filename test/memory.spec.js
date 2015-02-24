describe('MAG8 memory:', function(){

    var mem;

    beforeEach(function(){
        mem = new MAG.mag8.Memory;
    });

    it('should define a reset method', function(){
        expect(mem.reset).toBeDefined();
        expect(typeof mem.reset).toEqual('function');
    });

    it('should define a store method', function(){
        expect(mem.store).toBeDefined();
        expect(typeof mem.store).toEqual('function');
    });

    it('should define a get method', function(){
        expect(mem.get).toBeDefined();
        expect(typeof mem.get).toEqual('function');
    });

    it('should store valid values',function(){
        mem.store(0xff,0xfff);
        expect(mem.get(0xfff)).toEqual(0xff);
        mem.store(0x9,0x0);
        expect(mem.get(0x0)).toEqual(0x9);
    });

    it('should throw errors if store address is invalid',function(){
        expect(function(){
            mem.store(0xA,0x1000)
        }).toThrowError('Invalid address 4096');
    });

    it('should throw errors if store value is invalid',function(){
        expect(function(){
            mem.store(-1,0xff)
        }).toThrowError('Invalid value -1');

        expect(function(){
            mem.store(0x100,0xff)
        }).toThrowError('Invalid value 256');
    });

    it('should throw errors if get address is invalid',function(){
        expect(function(){
            mem.get(0x1000)
        }).toThrowError('Invalid address 4096');
    });

    it('should reset all memory slots to 0 on a call to reset',function(){
        var i;
        for(i=0x0; i < 0x1000; i++){
            mem.store(0xff,i);
        }
        mem.reset();
        for(i=0x0; i < 0x1000; i++){
            expect(mem.get(i)).toEqual(0x0);
        }
    });
});