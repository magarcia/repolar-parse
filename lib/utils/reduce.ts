import forEach from "./forEach";

export default function reduce<T>(
  array: T[],
  base: T,
  combine: (a: T, b: T) => T
): T {
  forEach(array, (element: T) => {
    base = combine(base, element);
  });
  return base;
}
