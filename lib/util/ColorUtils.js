var tinycolor = require("tinycolor2");
var extend = require("./extend");

var ColorUtils = {

  toHsvObject : function(color) {
    return tinycolor(color).toHsv();
  },

  toRgbString : function(hsv) {
    // have to clone because tinycolor mutates inputs (wtf)
    return tinycolor(extend({}, hsv)).toRgbString();
  },

  equals : function(a, b) {
    return tinycolor.equals(a, b);
  },

  isDark : function(hsv) {
    return tinycolor(extend({}, hsv)).isDark();
  }

};

module.exports = ColorUtils;
