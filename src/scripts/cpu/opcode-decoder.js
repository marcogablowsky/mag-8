'use strict';

MAG.mag8.OpcodeDecoder = function() {
  const _addressArgs = function(opcode) {
    return { address: opcode & 0x0fff };
  };

  const _xArgs = function(opcode) {
    return { x: (opcode & 0x0f00) >> 8 };
  };

  const _xkkArgs = function(opcode) {
    const obj = _xArgs(opcode);
    obj.kk = opcode & 0x00ff;
    return obj;
  };

  const _xyArgs = function(opcode) {
    const obj = _xArgs(opcode);
    obj.y = (opcode & 0x00f0) >> 4;
    return obj;
  };

  const _xynArgs = function(opcode) {
    const obj = _xyArgs(opcode);
    obj.n = opcode & 0x000f;
    return obj;
  };

  const _decode0xxx = function(opcode) {
    switch (opcode) {
      case 0x00e0:
        return { ref: 'CLS' };
      case 0x00ee:
        return { ref: 'RET' };
    }
  };

  const _decode8xxx = function(opcode) {
    switch (opcode & 0x000f) {
      case 0x0:
        return { ref: 'LDxy', args: _xyArgs(opcode) };
      case 0x1:
        return { ref: 'ORxy', args: _xyArgs(opcode) };
      case 0x2:
        return { ref: 'ANDxy', args: _xyArgs(opcode) };
      case 0x3:
        return { ref: 'XORxy', args: _xyArgs(opcode) };
      case 0x4:
        return { ref: 'ADDxy', args: _xyArgs(opcode) };
      case 0x5:
        return { ref: 'SUBxy', args: _xyArgs(opcode) };
      case 0x6:
        return { ref: 'SHRxy', args: _xyArgs(opcode) };
      case 0x7:
        return { ref: 'SUBNxy', args: _xyArgs(opcode) };
      case 0xe:
        return { ref: 'SHLxy', args: _xyArgs(opcode) };
    }
  };

  const _decodeExxx = function(opcode) {
    switch (opcode & 0x00ff) {
      case 0x009e:
        return { ref: 'SKPx', args: _xArgs(opcode) };
      case 0x00a1:
        return { ref: 'SKNPx', args: _xArgs(opcode) };
    }
  };

  const _decodeFxxx = function(opcode) {
    switch (opcode & 0x00ff) {
      case 0x0007:
        return { ref: 'LDxDt', args: _xArgs(opcode) };
      case 0x000a:
        return { ref: 'LDxK', args: _xArgs(opcode) };
      case 0x0015:
        return { ref: 'LDDtx', args: _xArgs(opcode) };
      case 0x0018:
        return { ref: 'LDStx', args: _xArgs(opcode) };
      case 0x001e:
        return { ref: 'ADDIx', args: _xArgs(opcode) };
      case 0x0029:
        return { ref: 'LDFx', args: _xArgs(opcode) };
      case 0x0033:
        return { ref: 'LDBx', args: _xArgs(opcode) };
      case 0x0055:
        return { ref: 'LDIx', args: _xArgs(opcode) };
      case 0x0065:
        return { ref: 'LDxI', args: _xArgs(opcode) };
    }
  };

  const decode = function(opcode) {
    switch (opcode & 0xf000) {
      case 0x0000:
        return _decode0xxx(opcode);
      case 0x1000:
        return { ref: 'JP', args: _addressArgs(opcode) };
      case 0x2000:
        return { ref: 'CALL', args: _addressArgs(opcode) };
      case 0x3000:
        return { ref: 'SExkk', args: _xkkArgs(opcode) };
      case 0x4000:
        return { ref: 'SNExkk', args: _xkkArgs(opcode) };
      case 0x5000:
        return { ref: 'SExy', args: _xyArgs(opcode) };
      case 0x6000:
        return { ref: 'LDxkk', args: _xkkArgs(opcode) };
      case 0x7000:
        return { ref: 'ADDxkk', args: _xkkArgs(opcode) };
      case 0x8000:
        return _decode8xxx(opcode);
      case 0x9000:
        return { ref: 'SNExy', args: _xyArgs(opcode) };
      case 0xa000:
        return { ref: 'LD', args: _addressArgs(opcode) };
      case 0xb000:
        return { ref: 'JPv0', args: _addressArgs(opcode) };
      case 0xc000:
        return { ref: 'RNDxkk', args: _xkkArgs(opcode) };
      case 0xd000:
        return { ref: 'DRWxyn', args: _xynArgs(opcode) };
      case 0xe000:
        return _decodeExxx(opcode);
      case 0xf000:
        return _decodeFxxx(opcode);
    }
  };

  return {
    decode: decode
  };
};
