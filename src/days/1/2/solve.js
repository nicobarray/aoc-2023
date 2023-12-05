export default function solve(input) {
  const alphaNumbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(String);

  return input
    .split("\n")
    .map((line) => {
      let first = undefined;
      let last = undefined;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (numbers.includes(char)) {
          if (first === undefined) {
            first = char;
          }
          last = char;
        }

        const index = alphaNumbers.findIndex((alpha) =>
          line.substring(i).startsWith(alpha)
        );

        if (index !== -1) {
          if (first === undefined) {
            first = String(index + 1);
          }
          last = String(index + 1);
        }
      }

      return first + last;
    })
    .reduce((a, b) => a + Number(b), 0);
}
