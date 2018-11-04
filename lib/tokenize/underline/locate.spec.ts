import locate from "./locate";

describe("underline locate", () => {
  test("should find the symbol", () => {
    expect(locate("..._", 0)).toEqual(3);
  });

  test("should find the symbol from index", () => {
    expect(locate("_.._", 2)).toEqual(3);
  });

  test("should not find the symbol if not exists", () => {
    expect(locate("   ", 0)).toEqual(-1);
  });
});
