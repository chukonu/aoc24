// --- Day 2: Red-Nosed Reports ---
// "How many reports are now safe?"

import { readInput } from "./util.ts";

const reports = readInput()
  .split("\n")
  .filter((l) => l);

function isSafe(report: string): boolean {
  const levels: number[] = report.split(/\s+/).map((x) => parseInt(x));
  const n = levels.length;
  let p = 0,
    q = 0;
  for (let i = 1, j = n - 1; i < n && j > 0; i++, j--) {
    const di = levels[i] - levels[i - 1],
      dj = levels[j] - levels[j - 1];
    if (
      di != 0 &&
      dj != 0 &&
      Math.abs(di) < 4 &&
      Math.abs(dj) < 4 &&
      p * di >= 0 &&
      q * dj >= 0
    ) {
      p = di;
      q = dj;
      continue;
    } else {
      return false;
    }
  }

  return true;
}

const answer = reports.filter(isSafe).length;

console.log(answer);
