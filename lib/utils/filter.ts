import forEach from "./forEach";

export default function filter<T>(array: T[], func: (x: T) => boolean): T[] {
  let result: T[] = [];
  forEach(array, (element: T) => {
    if (func(element)) result.push(element);
  });
  return result;
}
