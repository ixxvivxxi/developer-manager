//function from @0xadada/random-emoji
export default function emoji() {
  const [max, min] = [0x1f600, 0x1f64f];
  const codePoint = Math.floor(Math.random() * (max - min) + min);
  return String.fromCodePoint(codePoint);
}
