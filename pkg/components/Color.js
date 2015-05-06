var Colr = require("colr");

function Color() {
  this.hsv = undefined;
  this.alpha = 1;
}

Color.prototype = {
  constructor : Color,

  fromString : function(string) {
    var match = string.match(/\(([\s\d,\.]+)\)/),
      alpha = 1,
      hsv;

    if (string.indexOf("#") === 0) {
      hsv = Colr.fromHex(string).toHsvObject();
    } else if (match !== null) {
      var rgbArray = match.pop().split(",").map(function(number) {
        return number.indexOf(".") === -1 ? parseInt(number, 10) : parseFloat(number);
      });
      if (string.indexOf("rgba") === 0) {
        alpha = rgbArray.pop();
        hsv = Colr.fromRgbArray(rgbArray).toHsvObject();
      } else if (string.indexOf("rgb") === 0) {
        hsv = Colr.fromRgbArray(rgbArray).toHsvObject();
      }
    } else {
      throw "Unable to parse hex, rgb or rgba value";
    }

    this.fromHsvAlpha(hsv, alpha);

    return this;
  },

  fromHsvAlpha : function(hsv, alpha) {
    this.hsv = hsv;
    this.alpha = alpha;

    return this;
  },

  fromHsv : function(hsv) {
    this.hsv = hsv;

    return this;
  },

  toLuminosity : function() {
    return Colr.fromHsvObject(this.hsv).toGrayscale() / 255;
  },

  toBackgroundHue : function() {
    return Colr.fromHsv(this.hsv.h, 100, 100).toHex();
  },

  toRgba : function() {
    var rgb = Colr.fromHsvObject(this.hsv).toRgbObject();
    return "rgba("+rgb.r+","+rgb.g+","+rgb.b+","+this.alpha+")";
  },

  isEqual : function(otherColor) {
    for(var key in this.hsv) {
      if (this.hsv[key] !== otherColor.hsv[key]) {
        return false;
      }
    }
    return this.alpha === otherColor.alpha;
  }

};

module.exports = Color;
