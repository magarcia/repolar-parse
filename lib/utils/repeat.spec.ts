import repeat from "./repeat";

describe(repeat, () => {
  test("should work with basic input", () => {
    expect(repeat(" ", 2)).toEqual("  ");
  });

  test("should work with zero length", () => {
    expect(repeat(" ", 0)).toEqual("");
  });

  test("should throw exception with -1 length", () => {
    expect(() => repeat(" ", -1)).toThrowError(/^Invalid length$/);
  });

  test("should throw exception with negative length", () => {
    expect(() => repeat(" ", -2)).toThrowError(/^Invalid length$/);
  });

  test("should throw exception with float numbers", () => {
    expect(() => repeat(" ", 1.4)).toThrowError(/^Invalid length$/);
  });
});
