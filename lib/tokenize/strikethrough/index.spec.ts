import strikethrough from "./";

describe("strikethrough", () => {
  let addMock: any, eatMock: any, self: any;

  beforeEach(() => {
    addMock = jest.fn(() => {});
    eatMock = jest.fn(() => addMock);
    eatMock.now = jest.fn(() => ({ column: 0, offset: 0 }));
    self = { tokenizeInline: jest.fn(() => "tokenizeInline") };
  });

  afterEach(() => {
    addMock.mockReset();
    eatMock.mockReset();
    self.tokenizeInline.mockReset();
  });

  ["strikethrough", "complex-strikethrough", ""].forEach(valid => {
    test(`should parse -${valid}-`, () => {
      strikethrough.bind(self)(eatMock, `-${valid}-`);

      expect(eatMock).lastCalledWith(`-${valid}-`);
      expect(addMock).lastCalledWith({
        type: "delete",
        children: "tokenizeInline"
      });
      expect(self.tokenizeInline).lastCalledWith(valid, {
        column: 1,
        offset: 1
      });
    });
  });

  ["- strikethrough-", "*strikethrough-", "-strikethrough"].forEach(invalid => {
    test(`should not parse invalid string: ${invalid}`, () => {
      strikethrough.bind(self)(eatMock, invalid);

      expect(eatMock).not.toBeCalled();
      expect(addMock).not.toBeCalled();
      expect(self.tokenizeInline).not.toBeCalled();
    });
  });
});
