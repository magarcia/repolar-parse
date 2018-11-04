import reduce from "./reduce";

describe("reduce", () => {
  test("should call the callback for each item", () => {
    const mockCallback = jest.fn((x, y) => x + y);

    reduce([0, 1], 0, mockCallback);
    expect(mockCallback.mock.calls.length).toBe(2);
  });

  test("should not call the callback if the array is empty", () => {
    const mockCallback = jest.fn((x, y) => x + y);

    reduce([], 0, mockCallback);
    expect(mockCallback.mock.calls.length).toBe(0);
  });

  test("should return the base if the array is empty", () => {
    const mockCallback = jest.fn((x, y) => x + y);

    expect(reduce([], 0, mockCallback)).toEqual(0);
  });

  test("should return the processed result from base and the array", () => {
    const mockCallback = jest.fn((x, y) => x + y);

    expect(reduce([1, 1, 1, 1], 0, mockCallback)).toEqual(4);
  });
});
