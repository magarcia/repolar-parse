import strong from "./";

describe("strong", () => {
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
    eatMock.now.mockReset();
    self.tokenizeInline.mockReset();
  });

  ["strong", "complex-strong"].forEach(valid => {
    test(`should parse *${valid}*`, () => {
      strong.bind(self)(eatMock, `*${valid}*`);

      expect(eatMock).lastCalledWith(`*${valid}*`);
      expect(addMock).lastCalledWith({
        type: "strong",
        children: "tokenizeInline"
      });
      expect(self.tokenizeInline).lastCalledWith(valid, {
        column: 1,
        offset: 1
      });
    });
  });

  ["* strong*", "-strong*", "*strong", "**", "*strong *"].forEach(invalid => {
    test(`should not parse invalid string: ${invalid}`, () => {
      strong.bind(self)(eatMock, invalid);

      expect(eatMock).not.toBeCalled();
      expect(addMock).not.toBeCalled();
    });
  });
});
