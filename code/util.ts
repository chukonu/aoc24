export function readInput(): string {
  const input = Deno.args[0];
  if (!input) {
    throw new Error("no puzzle input");
  }
  return Deno.readTextFileSync(input);
}

export function readLines(): string[] {
  return readInput()
    .split("\n")
    .filter((l) => l);
}

/**
 * Yield sections from puzzle input. Sections are separated by empty lines.
 */
export function* inputSections(): Generator<string, void, unknown> {
  let buffer: string = "";
  const input = readInput();
  for (const line of input.split("\n")) {
    if (line) {
      buffer = buffer + line + "\n";
    } else {
      yield buffer;
      buffer = "";
    }
  }
  yield buffer;
}

export function not<T>(predicate: (this: T, ...args: any[]) => boolean) {
  return function (this: T, ...args: Parameters<typeof predicate>) {
    return !predicate.apply(this, args);
  };
}

export function sumUp(accu: number, curr: number): number {
  return curr + accu;
}
