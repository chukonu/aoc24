import { readInput, sumUp } from "./util.ts";

type coordinate = [x: number, y: number];

const input: string[][] = readInput()
  .split("\n")
  .map((l) => l.split(""));

function check([x, y]: coordinate, [dx, dy]: coordinate): number {
  return input[x + dx]?.[y + dy] == "M" &&
    input[x + 2 * dx]?.[y + 2 * dy] == "A" &&
    input[x + 3 * dx]?.[y + 3 * dy] == "S"
    ? 1
    : 0;
}

function* XCoordinates(text: string[][]): Generator<coordinate, void, unknown> {
  for (const [i, row] of text.entries()) {
    for (const [j, char] of row.entries()) {
      if (char == "X") {
        yield [i, j];
      }
    }
  }
}

const answer = XCoordinates(input)
  .toArray()
  .map(
    (coord) =>
      check(coord, [0, 1]) +
      check(coord, [0, -1]) +
      check(coord, [1, 0]) +
      check(coord, [-1, 0]) +
      check(coord, [-1, -1]) +
      check(coord, [-1, 1]) +
      check(coord, [1, -1]) +
      check(coord, [1, 1])
  )
  .reduce(sumUp, 0);

console.log(answer);
