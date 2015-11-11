var parse = require("pure-color/parse");
var rgb2hsv = require("pure-color/convert/rgb2hsv");
var hsv2rgb = require("pure-color/convert/hsv2rgb");
var rgb2string = require("pure-color/convert/rgb2string");
var rgb2grayscale = require("pure-color/convert/rgb2grayscale");

var ColorUtils = {

  parseToHsv : function(color) {
    color = parse(color);
    var hsv  = rgb2hsv(color);

    var alpha = color.length === 4 ? color[3] : 1;
    hsv.push(alpha);

    return hsv;
  },

  toRgbString : function(hsv) {
    var rgb = hsv2rgb(hsv);

    if(hsv.length === 4) {
      rgb.push(hsv[3]);
    }

    return rgb2string(rgb);
  },

  equals : function(hsv1, hsv2) {
    return ColorUtils.toRgbString(hsv1) === ColorUtils.toRgbString(hsv2);
  },

  isDark : function(hsv) {
    return rgb2grayscale(hsv2rgb(hsv)) <= 128;
  }

};

module.exports = ColorUtils;
