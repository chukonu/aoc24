import { readInput } from "./util.ts";

const xs: number[] = [],
  ys: number[] = [];

readInput()
  .split("\n")
  .filter((l) => l)
  .map((l) => l.split(/\s+/).map((n) => parseInt(n)))
  .forEach(([x, y]) => {
    xs.push(x);
    ys.push(y);
  });

xs.sort();
ys.sort();

const answer = xs.map((x, i) => Math.abs(x - ys[i])).reduce((a, c) => a + c, 0);
console.log(answer);
