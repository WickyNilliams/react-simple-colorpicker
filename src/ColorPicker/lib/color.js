import parse from "pure-color/parse";
import rgb2hsv from "pure-color/convert/rgb2hsv";
import hsv2rgb from "pure-color/convert/hsv2rgb";
import rgb2string from "pure-color/convert/rgb2string";
import rgb2grayscale from "pure-color/convert/rgb2grayscale";


/**
 * convert to hsv color type
 *
 * @param {String} color
 * @return {Array}
 */
export function parseToHsv(color)
{
	color = parse(color);
	const hsv = rgb2hsv(color);

	const alpha = color.length === 4 ? color[3] : 1;
	hsv.push(alpha);

	return hsv;
}

/**
 * convert HSV to RGB
 *
 * @param {Array} hsv
 * @return {String}
 */
export function toRgbString(hsv)
{
	const rgb = hsv2rgb(hsv);

	if (hsv.length === 4)
	{
		rgb.push(hsv[3]);
	}

	return rgb2string(rgb);
}

/**
 * equals
 *
 * @param {Array} hsv1
 * @param {Array} hsv2
 * @return {Boolean}
 */
export function equals(hsv1, hsv2)
{
	return toRgbString(hsv1) === toRgbString(hsv2);
}

/**
 * is darkness tone
 *
 * @param {Array} hsv
 * @return {Boolean}
 */
export function isDark(hsv)
{
	return rgb2grayscale(hsv2rgb(hsv)) <= 128;
}
