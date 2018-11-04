import forEach from "./forEach";

export default function map<T, E>(array: T[], func: (a: T) => E): E[] {
  let result: E[] = [];
  forEach(array, function(element: T) {
    result.push(func(element));
  });
  return result;
}
