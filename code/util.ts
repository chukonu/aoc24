export function readInput(): string {
  const input = Deno.args[0];
  if (!input) {
    throw new Error("no puzzle input");
  }
  return Deno.readTextFileSync(input);
}

export function sumUp(accu: number, curr: number): number {
  return curr + accu;
}
