import { readInput } from "./util.ts";

const xs: string[] = [],
  ys: string[] = [];

readInput()
  .split("\n")
  .filter((l) => l)
  .map((l) => l.split(/\s+/))
  .forEach(([x, y]) => {
    xs.push(x);
    ys.push(y);
  });

const times = ys.reduce(
  (a, y) => Object.assign(a, { [y]: 1 + (a[y] ?? 0) }),
  {} as Record<string, number>
);

const answer = xs
  .map((x) => (times[x] ?? 0) * parseInt(x))
  .reduce((a, c) => a + c, 0);

console.log(answer);
