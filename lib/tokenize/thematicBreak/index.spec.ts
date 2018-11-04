import thematicBreak from "./";

describe("thematicBreak", () => {
  let addMock: any, eatMock: any, self: any;

  beforeEach(() => {
    addMock = jest.fn(() => {});
    eatMock = jest.fn(() => addMock);
  });

  afterEach(() => {
    addMock.mockReset();
    eatMock.mockReset();
  });

  test(`should parse ---`, () => {
    thematicBreak.bind(self)(eatMock, `---`);

    expect(eatMock).lastCalledWith(`---`);
    expect(addMock).lastCalledWith({
      type: "thematicBreak"
    });
  });

  ["***", "___", "----", "- -- -", "- - -"].forEach(invalid => {
    test(`should not parse invalid string: ${invalid}`, () => {
      thematicBreak.bind(self)(eatMock, invalid);

      expect(eatMock).not.toBeCalled();
      expect(addMock).not.toBeCalled();
    });
  });
});
