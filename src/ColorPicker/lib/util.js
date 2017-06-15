/**
 * clamp number
 *
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
export function clamp(value, min, max)
{
	return Math.min(Math.max(value, min), max);
}