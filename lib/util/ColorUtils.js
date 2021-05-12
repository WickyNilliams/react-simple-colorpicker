"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseToHsv = parseToHsv;
exports.toRgbString = toRgbString;
exports.equals = equals;
exports.isDark = isDark;

var _parse = require("pure-color/parse");

var _parse2 = _interopRequireDefault(_parse);

var _rgb2hsv = require("pure-color/convert/rgb2hsv");

var _rgb2hsv2 = _interopRequireDefault(_rgb2hsv);

var _hsv2rgb = require("pure-color/convert/hsv2rgb");

var _hsv2rgb2 = _interopRequireDefault(_hsv2rgb);

var _rgb2string = require("pure-color/convert/rgb2string");

var _rgb2string2 = _interopRequireDefault(_rgb2string);

var _rgb2grayscale = require("pure-color/convert/rgb2grayscale");

var _rgb2grayscale2 = _interopRequireDefault(_rgb2grayscale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseToHsv(color) {
  color = (0, _parse2.default)(color);
  var hsv = (0, _rgb2hsv2.default)(color);

  var alpha = color.length === 4 ? color[3] : 1;
  hsv.push(alpha);

  return hsv;
}

function toRgbString(hsv) {
  var rgb = (0, _hsv2rgb2.default)(hsv);

  if (hsv.length === 4) {
    rgb.push(hsv[3]);
  }

  return (0, _rgb2string2.default)(rgb);
}

function equals(hsv1, hsv2) {
  return toRgbString(hsv1) === toRgbString(hsv2);
}

function isDark(hsv) {
  return (0, _rgb2grayscale2.default)((0, _hsv2rgb2.default)(hsv)) <= 128;
}