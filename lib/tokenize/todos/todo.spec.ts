import todos from "./";

describe("todos", () => {
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

  test("should parse valid todoss", () => {
    todos.bind(self)(eatMock, `- todo 1\n- todo 2\n+ done`);

    expect(eatMock).lastCalledWith(`- todo 1\n- todo 2\n+ done`);
    expect(addMock).lastCalledWith({
      type: "list",
      ordered: false,
      children: [
        {
          type: "listItem",
          checked: false,
          children: "tokenizeBlock"
        },
        {
          type: "listItem",
          checked: false,
          children: "tokenizeBlock"
        },
        {
          type: "listItem",
          checked: true,
          children: "tokenizeBlock"
        }
      ]
    });
    expect(self.tokenizeBlock).toBeCalledWith("todo 1", position);
    expect(self.tokenizeBlock).toBeCalledWith("todo 2", position);
    expect(self.tokenizeBlock).toBeCalledWith("done", position);
  });

  test("should not parse todoss that doesn't start with - or +", () => {
    todos.bind(self)(eatMock, `* todo 1\n* todo 2\n* done`);

    expect(eatMock).not.toBeCalled();
  });

  test("should not parse strings thats only new lines", () => {
    todos.bind(self)(eatMock, `\n\n\n\n\n\n\n\n`);

    expect(eatMock).not.toBeCalled();
  });
});
