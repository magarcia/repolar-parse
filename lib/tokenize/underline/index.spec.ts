import underline from "./";

describe("underline", () => {
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

  ["underline", "complex-underline"].forEach(valid => {
    test(`should parse _${valid}_`, () => {
      underline.bind(self)(eatMock, `_${valid}_`);

      expect(eatMock).lastCalledWith(`_${valid}_`);
      expect(addMock).lastCalledWith({
        type: "underline",
        data: {
          hName: "u"
        },
        children: "tokenizeInline"
      });
      expect(self.tokenizeInline).lastCalledWith(valid, {
        column: 1,
        offset: 1
      });
    });
  });

  ["_ underline_", "-underline_", "_underline", "__", "_underline _"].forEach(
    invalid => {
      test(`should not parse invalid string: ${invalid}`, () => {
        underline.bind(self)(eatMock, invalid);

        expect(eatMock).not.toBeCalled();
        expect(addMock).not.toBeCalled();
      });
    }
  );
});
