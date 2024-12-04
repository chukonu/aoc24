import { readInput } from "./util.ts";

let answer = 0;

for (const match of readInput().matchAll(/mul\((\d+),(\d+)\)/g)) {
  answer += parseInt(match[1]) * parseInt(match[2]);
}

console.log(answer);
