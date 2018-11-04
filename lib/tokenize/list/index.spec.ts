import list from "./";

describe("list", () => {
  let addMock: any, eatMock: any, self: any;
  let position = {
    column: 0,
    offset: 0
  };

  beforeEach(() => {
    addMock = jest.fn(() => {});
    eatMock = jest.fn(() => addMock);
    eatMock.now = jest.fn(() => position);
    self = { tokenizeBlock: jest.fn(() => "tokenizeBlock") };
  });

  afterEach(() => {
    addMock.mockReset();
    eatMock.mockReset();
    eatMock.now.mockReset();
    self.tokenizeBlock.mockReset();
  });

  test("should parse valid lists", () => {
    list.bind(self)(eatMock, `* item 1\n* item 2`);

    expect(eatMock).lastCalledWith(`* item 1\n* item 2`);
    expect(addMock).lastCalledWith({
      type: "list",
      ordered: false,
      children: [
        {
          type: "listItem",
          children: "tokenizeBlock"
        },
        {
          type: "listItem",
          children: "tokenizeBlock"
        }
      ]
    });
    expect(self.tokenizeBlock).toBeCalledWith("item 1", position);
    expect(self.tokenizeBlock).toBeCalledWith("item 2", position);
  });

  test("should parse valid ordered lists", () => {
    list.bind(self)(eatMock, `1. item 1\n1. item 2`);

    expect(eatMock).lastCalledWith(`1. item 1\n1. item 2`);
    expect(addMock).lastCalledWith({
      type: "list",
      ordered: true,
      children: [
        {
          type: "listItem",
          children: "tokenizeBlock"
        },
        {
          type: "listItem",
          children: "tokenizeBlock"
        }
      ]
    });
    expect(self.tokenizeBlock).toBeCalledWith("item 1", position);
    expect(self.tokenizeBlock).toBeCalledWith("item 2", position);
  });

  test("should parse valid ordered lists regarless the initial number", () => {
    list.bind(self)(eatMock, `2. item 1\n3. item 2`);

    expect(eatMock).lastCalledWith(`2. item 1\n3. item 2`);
    expect(addMock).lastCalledWith({
      type: "list",
      ordered: true,
      start: "2",
      children: [
        {
          type: "listItem",
          children: "tokenizeBlock"
        },
        {
          type: "listItem",
          children: "tokenizeBlock"
        }
      ]
    });
    expect(self.tokenizeBlock).toBeCalledWith("item 1", position);
    expect(self.tokenizeBlock).toBeCalledWith("item 2", position);
  });

  test("should not parse lists that doesn't start with *", () => {
    list.bind(self)(eatMock, `- item 1\n- item 2`);

    expect(eatMock).not.toBeCalled();
  });

  test("should not parse lists that doesn't start with decimal followed by dot", () => {
    list.bind(self)(eatMock, `1) item 1\n1) item 2`);

    expect(eatMock).not.toBeCalled();
  });

  test("should not parse strings thats only new lines", () => {
    list.bind(self)(eatMock, `\n\n\n\n\n\n\n\n`);

    expect(eatMock).not.toBeCalled();
  });
});
