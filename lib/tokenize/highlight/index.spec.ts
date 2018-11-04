import highlight from "./";

describe("highlight", () => {
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

  ["highlight", "complex-highlight", ""].forEach(valid => {
    test(`should parse ::${valid}::`, () => {
      highlight.bind(self)(eatMock, `::${valid}::`);

      expect(eatMock).lastCalledWith(`::${valid}::`);
      expect(addMock).lastCalledWith({
        type: "highlight",
        data: {
          hName: "mark"
        },
        children: "tokenizeInline"
      });
      expect(self.tokenizeInline).lastCalledWith(valid, {
        column: 2,
        offset: 2
      });
    });
  });

  [":: highlight::", "-highlight::", "::highlight", "::highlight ::"].forEach(
    invalid => {
      test(`should not parse invalid string: ${invalid}`, () => {
        highlight.bind(self)(eatMock, invalid);

        expect(eatMock).not.toBeCalled();
        expect(addMock).not.toBeCalled();
      });
    }
  );
});
