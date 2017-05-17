/**
 * defines
 */

goog.provide('USE_TYPEDARRAY');

// Since Safari becomes typeof Uint8Array === 'object', it decides to use
// the typed array depending on whether it is undefined or not

/** @const {number} use typed array flag. */
var USE_TYPEDARRAY = (
  goog.global.Uint8Array !== void 0 &&
  goog.global.Uint16Array !== void 0 &&
  goog.global.Uint32Array !== void 0
);
