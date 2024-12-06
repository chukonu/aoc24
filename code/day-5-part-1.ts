import { getRulesMap, isInOrder, RulesMap } from "./day-5.ts";
import { inputSections, sumUp } from "./util.ts";

const [rules, updates] = inputSections().toArray();

const rulesMap: RulesMap = getRulesMap(rules);

const answer = updates
  .split("\n")
  .filter((l) => l)
  .map((l) => l.split(",").map((x) => parseInt(x)))
  .filter(isInOrder.bind(rulesMap))
  .map((xs) => xs[Math.floor(xs.length / 2)])
  .reduce(sumUp, 0);

console.log(answer);
