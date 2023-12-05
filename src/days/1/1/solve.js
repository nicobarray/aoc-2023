export default function solve(input) {
  return input
    .split("\n")
    .map((line) => {
      return line
        .split("")
        .map(Number)
        .filter((n) => n === 0 || Boolean(n));
    })
    .map((n) => n[0] + "" + n[n.length - 1])
    .map(Number)
    .reduce((a, b) => a + b, 0);
}
