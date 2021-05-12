"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clamp;
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}