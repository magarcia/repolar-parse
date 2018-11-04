export default function takeWhile<T>(
  items: T[],
  check: (item: T) => boolean
): T[] {
  let i: number = -1;
  let result: T[] = [];
  while (++i < items.length && check(items[i])) {
    result.push(items[i]);
  }
  return result;
}
