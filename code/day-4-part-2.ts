import { readInput } from "./util.ts";

const input: string[][] = readInput()
  .split("\n")
  .map((l) => l.split(""));

type coordinate = [x: number, y: number];

function* Coordinates(
  target: string,
  text: string[][]
): Generator<coordinate, void, unknown> {
  for (const [i, row] of text.entries()) {
    for (const [j, char] of row.entries()) {
      if (char == target) {
        yield [i, j];
      }
    }
  }
}

function check([x, y]: coordinate): boolean {
  const arr1 = Array.of(input[x - 1]?.[y - 1], input[x + 1]?.[y + 1]),
    arr2 = Array.of(input[x + 1]?.[y - 1], input[x - 1]?.[y + 1]);

  const constraint = (xs: string[]) =>
    xs.filter((x) => x == "M").length == 1 &&
    xs.filter((x) => x == "S").length == 1;

  return constraint(arr1) && constraint(arr2);
}

const answer = Coordinates("A", input)
  .toArray()
  .filter((coord) => check(coord)).length;

console.log(answer);
