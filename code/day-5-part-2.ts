import { getRulesMap, isInOrder } from "./day-5.ts";
import { inputSections, not, sumUp } from "./util.ts";

const [rules, updates] = inputSections().toArray();
const rulesMap = getRulesMap(rules);

function fixOrder(pageNumbers: number[]): number[] {
  return pageNumbers.sort((x, y) => {
    if (rulesMap[x].precedes.has(y)) {
      return -1;
    }
    if (rulesMap[x].follows.has(y)) {
      return 1;
    }
    return 0;
  });
}

const answer = updates
  .split("\n")
  .filter((l) => l)
  .map((l) => l.split(",").map((x) => parseInt(x)))
  .filter(not(isInOrder.bind(rulesMap)))
  .map(fixOrder)
  .map((xs) => xs[Math.floor(xs.length / 2)])
  .reduce(sumUp, 0);

console.log(answer);
