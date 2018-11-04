export default function forEach<T>(array: T[], action: (x: T) => void): void {
  for (let element of array) action(element);
}
