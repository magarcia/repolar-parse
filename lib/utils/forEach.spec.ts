import forEach from "./forEach";

describe("forEach", () => {
  test("should call the callback for each item", () => {
    const mockCallback = jest.fn(x => x);

    forEach([0, 1], mockCallback);
    expect(mockCallback.mock.calls.length).toBe(2);
  });

  test("should not call the callback if the array is empty", () => {
    const mockCallback = jest.fn(x => x);

    forEach([], mockCallback);
    expect(mockCallback.mock.calls.length).toBe(0);
  });
});
