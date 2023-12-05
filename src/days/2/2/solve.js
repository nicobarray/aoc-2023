export default function solve(input) {
  return input
    .split("\n")
    .map((line) => {
      const [game_, plays_] = line.split(":");

      const id = Number(game_.split(" ")[1]);

      const balls = {
        red: 0,
        green: 0,
        blue: 0,
      };

      for (let play of plays_.split(";")) {
        for (let picked of play.split(",")) {
          const [n, kind] = picked.trim().split(" ");
          balls[kind] = Math.max(Number(n), balls[kind]);
        }
      }

      return balls.red * balls.blue * balls.green;
    })
    .reduce((a, b) => a + b, 0);
}
