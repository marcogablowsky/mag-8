'use strict';

MAG.mag8.Memory = function(type, size) {
  const _validateParams = function(type, size) {
    if (typeof type !== 'string') {
      throw new Error('Type parameter must be a string');
    }
    if (typeof size !== 'number') {
      throw new Error('Size parameter must be a number');
    }
  };

  const _init = function(type, size) {
    _validateParams(type, size);
    const mem = {};
    if (type === '8-bit') {
      mem.data = new Uint8Array(size);
      mem.maxVal = 0xff;
    } else if (type === '16-bit') {
      mem.data = new Uint16Array(size);
      mem.maxVal = 0xffff;
    } else {
      throw new Error('unsupported memory type ' + type);
    }
    return mem;
  };

  const mem = _init(type, size);

  const reset = function() {
    for (let i = 0; i < mem.data.length; i++) {
      mem.data[i] = 0;
    }
  };

  const _checkAddress = function(address) {
    if (address < 0 || address >= mem.data.length) {
      throw new Error('Invalid address ' + address);
    }
  };

  const _checkValue = function(value) {
    if (value < 0 || value > mem.maxVal) {
      throw new Error('Invalid value ' + value);
    }
  };

  const store = function(value, address) {
    _checkAddress(address);
    _checkValue(value);
    mem.data[address] = value;
  };

  const get = function(address) {
    _checkAddress(address);
    return mem.data[address];
  };

  return {
    reset: reset,
    store: store,
    get: get
  };
};
