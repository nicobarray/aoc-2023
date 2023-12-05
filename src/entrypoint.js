import fs from "fs/promises";
import path from "path";
import * as url from "url";
import chalk from "chalk";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

async function fileExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch (err) {
    return false;
  }
}

async function run() {
  const day = Number(process.argv[2]);
  const part = Number(process.argv[3]);
  process.argv.shift(); // name
  process.argv.shift(); // day
  process.argv.shift(); // day-index
  process.argv.shift(); // part-index

  const opts = {};

  for (let opt of process.argv) {
    const [key, value] = opt.split("=");
    opts[key] = value || true;
  }

  if (Number.isNaN(day)) {
    console.log("$ aoc [day] [?part]");
    process.exit(1);
  }

  let days = (await fs.readdir(path.join(__dirname, "days")))
    .map(Number)
    .sort((a, b) => a - b)
    .filter((d) => d === day);

  for (let day of days.map(Number).sort((a, b) => a - b)) {
    console.log(`\n## ⭐️ Day ${day} ⭐️`);

    async function solvePart(partIndex) {
      const solver = path.resolve(
        path.join(__dirname, "days", String(day), String(partIndex), "solve.js")
      );
      const input = path.resolve(
        path.join(
          __dirname,
          "days",
          String(day),
          String(partIndex),
          "input.txt"
        )
      );
      const example = path.resolve(
        path.join(
          __dirname,
          "days",
          String(day),
          String(partIndex),
          "example.txt"
        )
      );

      const solverFn = (await import(solver)).default;

      const inputString = (await fileExists(input))
        ? (await fs.readFile(input)).toString("utf-8")
        : null;
      const exampleString = (await fileExists(example))
        ? (await fs.readFile(example)).toString("utf-8")
        : null;

      let exampleRes = undefined;
      if (exampleString) {
        exampleRes = await solverFn(exampleString);
      }

      let res = undefined;
      if (inputString && !opts["--only-example"]) {
        res = await solverFn(inputString);
      }

      console.log(
        "### Part " +
          partIndex +
          " :" +
          "\n\n" +
          chalk.green("#### Input") +
          "\n\n" +
          res +
          "\n\n" +
          chalk.grey("#### Example") +
          "\n\n" +
          exampleRes +
          "\n"
      );
    }

    if (Number.isNaN(part)) {
      await solvePart(1);
      await solvePart(2);
    } else {
      await solvePart(part);
    }
  }
}

run()
  .then((res) => {
    console.log("Success", res);
  })
  .catch((err) => {
    console.error("Failed", err);
  });
