import { readLines } from "./util.ts";

type Mark = "." | "#" | "^";

type Coordinate = [row: number, column: number];

function* Directions(): Generator<Coordinate, never, unknown> {
  const x = [-1, 0, 1, 0],
    y = [0, 1, 0, -1];
  let n = 0;
  while (true) {
    const i = n % 4;
    yield [x[i], y[i]];
    n++;
  }
}

function* GuardPositions(
  map: Mark[][],
  initial: Coordinate
): Generator<Coordinate, void, unknown> {
  const gen = Directions();
  let direction = gen.next().value;
  let current = initial;
  yield current;
  while (map[current[0]][current[1]]) {
    const [r, c] = current;
    const [dr, dc] = direction;
    const nextPos = map[r + dr]?.[c + dc];
    if (!nextPos) {
      return;
    } else if (nextPos !== "#") {
      yield (current = [r + dr, c + dc]);
    } else {
      direction = gen.next().value;
    }
  }
}

function findInitialPosition(map: Mark[][]): Coordinate {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] == "^") {
        return [i, j];
      }
    }
  }
  throw new Error("could not find initial position");
}

function toDistinctPositions(
  stats: Record<string, boolean>,
  position: Coordinate
): Record<string, boolean> {
  const [r, c] = position;
  stats[`${r},${c}`] = true;
  return stats;
}

const map: Mark[][] = readLines().map((l) => l.split("") as Mark[]);

const initial = findInitialPosition(map);

const distinctPositions = GuardPositions(map, initial)
  .toArray()
  .reduce(toDistinctPositions, {});

const answer = Object.keys(distinctPositions).length;
console.log(answer);
