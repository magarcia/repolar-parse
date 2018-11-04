export default function repeat(str: string, length: number): string {
  if (length < 0) throw new Error("Invalid length");
  try {
    return new Array(length + 1).join(str);
  } catch (err) {
    throw new Error("Invalid length");
  }
}
