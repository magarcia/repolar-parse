import filter from "./filter";

describe("filter", () => {
  test("should return empty array when input is empty", () => {
    const mockCallback = jest.fn(x => x);
    expect(filter([], mockCallback)).toEqual([]);
  });

  test("should return empty array when function returns always false", () => {
    const mockCallback = jest.fn(() => false);
    expect(filter([0, 1, 2, 3, 4], mockCallback)).toEqual([]);
  });

  test("should return the same array when function returns always true", () => {
    const mockCallback = jest.fn(() => true);
    expect(filter([0, 1, 2, 3, 4], mockCallback)).toEqual([0, 1, 2, 3, 4]);
  });

  test("should return a filtered array based on function logic", () => {
    const mockCallback = jest.fn(x => x > 2);
    expect(filter([0, 1, 2, 3, 4], mockCallback)).toEqual([3, 4]);
  });
});
