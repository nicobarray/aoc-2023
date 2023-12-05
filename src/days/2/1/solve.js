export default function solve(input) {
  const condition = {
    red: 12,
    green: 13,
    blue: 14,
  };

  console.log(condition);

  return input
    .split("\n")
    .map((line) => {
      const [game_, plays_] = line.split(":");

      const id = Number(game_.split(" ")[1]);

      for (let play of plays_.split(";")) {
        for (let picked of play.split(",")) {
          const [n, kind] = picked.trim().split(" ");
          if (condition[kind] < Number(n)) {
            return 0;
          }
        }
      }

      return id;
    })
    .reduce((a, b) => a + b, 0);
}
