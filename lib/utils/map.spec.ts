import map from "./map";

describe("map", () => {
  test("should call the callback for each item", () => {
    const mockCallback = jest.fn(x => x);

    map([0, 1], mockCallback);
    expect(mockCallback.mock.calls.length).toBe(2);
  });

  test("should not call the callback if the array is empty", () => {
    const mockCallback = jest.fn(x => x);

    map([], mockCallback);
    expect(mockCallback.mock.calls.length).toBe(0);
  });

  test("should return an empty array if the array is empty", () => {
    const mockCallback = jest.fn(x => x);

    expect(map([], mockCallback)).toEqual([]);
  });

  test("should return an array with the result of maps", () => {
    const mockCallback = jest.fn(x => x + 1);

    expect(map([0, 1, 2, 3], mockCallback)).toEqual([1, 2, 3, 4]);
  });
});
