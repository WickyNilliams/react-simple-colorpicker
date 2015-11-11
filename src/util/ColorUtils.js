const parse = require("pure-color/parse");
const rgb2hsv = require("pure-color/convert/rgb2hsv");
const hsv2rgb = require("pure-color/convert/hsv2rgb");
const rgb2string = require("pure-color/convert/rgb2string");
const rgb2grayscale = require("pure-color/convert/rgb2grayscale");


export function parseToHsv(color) {
  color = parse(color);
  const hsv  = rgb2hsv(color);

  const alpha = color.length === 4 ? color[3] : 1;
  hsv.push(alpha);

  return hsv;
}

export function toRgbString(hsv) {
  const rgb = hsv2rgb(hsv);

  if(hsv.length === 4) {
    rgb.push(hsv[3]);
  }

  return rgb2string(rgb);
}

export function equals(hsv1, hsv2) {
  return toRgbString(hsv1) === toRgbString(hsv2);
}

export function isDark(hsv) {
  return rgb2grayscale(hsv2rgb(hsv)) <= 128;
}