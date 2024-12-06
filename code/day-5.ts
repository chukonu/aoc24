export type RulesMap = Record<
  number,
  { follows: Set<number>; precedes: Set<number> }
>;

function toRulesMap(m: RulesMap, rule: string): RulesMap {
  const [x, y] = rule.split("|").map((x) => parseInt(x));
  m[x] = m[x] ?? { follows: new Set(), precedes: new Set() };
  m[y] = m[y] ?? { follows: new Set(), precedes: new Set() };
  m[x].precedes.add(y);
  m[y].follows.add(x);
  return m;
}

export function getRulesMap(x: string): RulesMap {
  return x.split("\n").reduce(toRulesMap, {} as RulesMap);
}

export function isInOrder(this: RulesMap, pageNumbers: number[]): boolean {
  for (let i = 0; i < pageNumbers.length - 1; i++) {
    const x = pageNumbers[i];
    for (let j = i + 1; j < pageNumbers.length; j++) {
      const y = pageNumbers[j];
      if (this[x].follows.has(y)) {
        return false;
      }
    }
    for (let j = 0; j < i; j++) {
      const y = pageNumbers[j];
      if (this[x].precedes.has(y)) {
        return false;
      }
    }
  }
  return true;
}
