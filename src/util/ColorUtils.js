import parse from "pure-color/parse";
import rgb2hsv from "pure-color/convert/rgb2hsv";
import hsv2rgb from "pure-color/convert/hsv2rgb";
import rgb2string from "pure-color/convert/rgb2string";
import rgb2grayscale from "pure-color/convert/rgb2grayscale";


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
