import { readLines, sumUp } from "./util.ts";

console.time();

const equations: number[][] = readLines().map((line) => {
  const [target, numbers] = line.split(":");
  return [
    parseInt(target),
    ...numbers
      .trim()
      .split(" ")
      .map((x) => parseInt(x)),
  ];
});

function isTrue(equation: number[]): boolean {
  const [target, ...numbers] = equation;

  const h: Record<number, Record<number, boolean>> = {};
  h[0] = { 0: true };

  for (let [i, n] of numbers.entries()) {
    i++;
    h[i] = {};

    for (const v of Object.keys(h[i - 1])) {
      h[i][n + parseInt(v)] = true;
      h[i][n * parseInt(v)] = true;
      // for part 2:
      h[i][parseInt(`${v}${n}`)] = true;
    }
  }
  return h[numbers.length][target] ?? false;
}

const answer = equations
  .filter((x) => isTrue(x))
  .map(([x]) => x)
  .reduce(sumUp, 0);

console.log(answer);
console.timeEnd();
