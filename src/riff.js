goog.provide('Riff.Parser');

goog.require('Typedef');

goog.scope(function() {

/**
 * @param {ByteArray} input input buffer.
 * @param {Object=} opt_params option parameters.
 * @constructor
 */
Riff.Parser = function(input, opt_params) {
  opt_params = opt_params || {};
  /** @type {ByteArray} */
  this.input = input;
  /** @type {number} */
  this.ip = opt_params.index || 0;
  /** @type {number} */
  this.length = opt_params.length || input.length - this.ip;
  /** @type {Array.<{type: string, size: number, offset: number}>} */
  this.chunkList;
  /** @type {number} */
  this.offset = this.ip;
  /** @type {boolean} */
  this.padding =
    opt_params.padding !== void 0 ? opt_params.padding : true;
  /** @type {boolean} */
  this.bigEndian =
    opt_params.bigEndian !== void 0 ? opt_params.bigEndian : false;
};

Riff.Parser.prototype.parse = function() {
  /** @type {number} */
  var length = this.length + this.offset;

  this.chunkList = [];

  while (this.ip < length) {
    this.parseChunk();
  }
};

Riff.Parser.prototype.parseChunk = function() {
  /** @type {ByteArray} */
  var input = this.input;
  /** @type {number} */
  var ip = this.ip;
  /** @type {number} */
  var size;

  this.chunkList.push({
    'type': String.fromCharCode(input[ip++], input[ip++], input[ip++], input[ip++]),
    'size': (size = this.bigEndian ?
       ((input[ip++] << 24) | (input[ip++] << 16) |
        (input[ip++] <<  8) | (input[ip++]      )) >>> 0 :
       ((input[ip++]      ) | (input[ip++] <<  8) |
        (input[ip++] << 16) | (input[ip++] << 24)) >>> 0
    ),
    'offset': ip
  });

  ip += size;

  // padding
  if (this.padding && ((ip - this.offset) & 1) === 1) {
    ip++;
  }

  this.ip = ip;
};

/**
 * @param {number} index chunk index.
 * @return {?{type: string, size: number, offset: number}}
 */
Riff.Parser.prototype.getChunk = function(index) {
  /** @type {{type: string, size: number, offset: number}} */
  var chunk = this.chunkList[index];

  if (chunk === void 0) {
    return null;
  }

  return chunk;
};

/**
 * @return {number}
 */
Riff.Parser.prototype.getNumberOfChunks = function() {
  return this.chunkList.length;
};

});
