import locate from "./locate";

describe("strong locate", () => {
  test("should find the symbol", () => {
    expect(locate("...*", 0)).toEqual(3);
  });

  test("should find the symbol from index", () => {
    expect(locate("*..*", 2)).toEqual(3);
  });

  test("should not find the symbol if not exists", () => {
    expect(locate("   ", 0)).toEqual(-1);
  });
});
