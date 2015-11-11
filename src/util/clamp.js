export default function clamp(val, min, max){
  return Math.min(Math.max(val, min), max);
}