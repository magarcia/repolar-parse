import isDecimal from "./isDecimal";
import forEach from "./forEach";

describe("isDecimal", () => {
  forEach([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], value => {
    test(`should return true when is checking number ${value}`, () => {
      expect(isDecimal(value.toString())).toBe(true);
    });
  });

  test("should return false when value is not decimal", () => {
    expect(isDecimal("a")).toBe(false);
  });
});
