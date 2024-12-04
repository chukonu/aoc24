import { readInput } from "./util.ts";

const memory: string = readInput();

function* Instruction(mem: string): Generator<RegExpExecArray, void, unknown> {
  const pattern = /(?:don't|do)\(\)|mul\((\d+),(\d+)\)/g;
  for (const match of mem.matchAll(pattern)) {
    yield match;
  }
}

type State = { do: boolean; answer: number };
const state: State = { do: true, answer: 0 };

function processInstructions(accu: State, curr: RegExpExecArray): State {
  if (curr[0] == "do()") {
    return { ...accu, do: true };
  }
  if (curr[0] == "don't()") {
    return { ...accu, do: false };
  }
  if (accu.do) {
    return {
      ...accu,
      answer: accu.answer + parseInt(curr[1]) * parseInt(curr[2]),
    };
  }
  return accu;
}

const { answer } = Instruction(memory)
  .toArray()
  .reduce(processInstructions, state);

console.log(answer);
