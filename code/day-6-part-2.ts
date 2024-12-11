import { readLines } from "./util.ts";

console.time();

type Mark = "." | "#" | "^" | "O";

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
  initial: Coordinate,
  yieldInitial = true
): Generator<[Coordinate, Coordinate], void, unknown> {
  const gen = Directions();
  let direction = gen.next().value;
  let current = initial;

  if (yieldInitial) {
    yield [current, direction];
  }

  while (map[current[0]][current[1]]) {
    const [r, c] = current;
    const [dr, dc] = direction;
    const nextPos = map[r + dr]?.[c + dc];
    if (!nextPos) {
      return;
    } else if (nextPos !== "#" && nextPos !== "O") {
      current = [r + dr, c + dc];
      yield [current, direction];
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

type PositionDirectionMap = Record<
  string,
  { visited: boolean; value: [Coordinate, Coordinate] }
>;

function toDistinctPositions(
  stats: PositionDirectionMap,
  value: [Coordinate, Coordinate]
): PositionDirectionMap {
  const [r, c] = value[0];
  stats[`${r},${c}`] = { visited: true, value };
  return stats;
}

function modifiedMap(map: Mark[][], position: Coordinate): Mark[][] {
  const _map = Array.from(map, (v) => Array.from(v));
  const [r, c] = position;
  _map[r][c] = "O";
  return _map;
}

const map: Mark[][] = readLines().map((l) => l.split("") as Mark[]);

const initial = findInitialPosition(map);

const distinctPositions = GuardPositions(map, initial)
  .toArray()
  .reduce(toDistinctPositions, {});

const answer = Object.values(distinctPositions)
  .filter(
    ({ value: [coord] }) => coord[0] !== initial[0] || coord[1] !== initial[1]
  )
  .map((x) => modifiedMap(map, x.value[0]))
  .filter((map) => {
    const memo: Record<string, boolean> = {};
    for (const [coord, dir] of GuardPositions(map, initial)) {
      const hash = `${coord[0]}-${coord[1]}-${dir[0]}-${dir[1]}`;
      if (memo[hash]) {
        return true;
      }
      memo[hash] = true;
    }
    return false;
  }).length;

console.log("answer:", answer);
console.timeEnd();
