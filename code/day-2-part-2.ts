// --- Day 2: Red-Nosed Reports ---
// Part 2, brute force

import { readInput } from "./util.ts";

const reports = readInput()
  .split("\n")
  .filter((l) => l);

function isSafe(levels: number[]): boolean {
  const n = levels.length;
  for (let i = 0, j = 1, _d = 0; i < n - 1 && j < n; i++, j++) {
    const d = levels[j] - levels[i];
    if (d != 0 && Math.abs(d) < 4 && d * _d >= 0) {
      _d = d;
    } else {
      return false;
    }
  }
  return true;
}

const answer = reports.filter((x) => {
  const levels = x.split(/\s+/).map((x) => parseInt(x)),
    n = levels.length;
  if (isSafe(levels)) {
    return true;
  }
  for (let i = 0; i < n; i++) {
    if (isSafe(levels.filter((_, _i) => _i != i))) {
      return true;
    }
  }
  return false;
}).length;

console.log(answer);
