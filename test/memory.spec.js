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

    it('should store values',function(){
        mem.store(0xA,0x0);
        expect(mem.get(0x0)).toEqual(0xA);
        mem.store(0x9,0x0);
        expect(mem.get(0x0)).toEqual(0x9);
    });

    it('should throw errors if store address is invalid',function(){
        expect(function(){
            mem.store(0xA,0x2000)
        }).toThrowError('Invalid address 8192');
    });

    it('should throw errors get address is invalid',function(){
        expect(function(){
            mem.get(0x2000)
        }).toThrowError('Invalid address 8192');
    });
});