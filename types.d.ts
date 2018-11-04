type Position = { line: number; column: number; offset: number };

interface AddType {
  (node: object, parent?: object): any;
  reset: (x: any) => {};
}

interface EatType {
  (s: string): AddType;
  now: () => Position;
}

export { EatType, Position, AddType };
