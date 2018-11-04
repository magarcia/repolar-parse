import { setBlockTokenizers, setInlineTokenizers } from "./index";
import { forEach } from "./lib/utils";

describe("repolar", () => {
  const dummyTokenizer = { something: 0 };

  describe("block tokenizers", () => {
    function buildParser(
      blockMethods: string[] = [],
      blockTokenizers: object = {}
    ) {
      function Parser() {}
      Parser.prototype.blockMethods = [...blockMethods];
      Parser.prototype.blockTokenizers = { ...blockTokenizers };
      Parser.prototype.inlineTokenizers = {
        deletion: dummyTokenizer
      };
      Parser.prototype.inlineMethods = ["deletion"];

      return Parser;
    }

    forEach(
      ["setextHeading", "definition", "footnote", "indentedCode", "table"],
      tokenizer => {
        test(`should remove ${tokenizer} tokenizer`, () => {
          const Parser = buildParser([tokenizer], {
            tokenizer: dummyTokenizer
          });

          setBlockTokenizers(Parser);

          expect(Parser.prototype.blockMethods.indexOf(tokenizer)).toBe(-1);
          expect(Parser.prototype.blockTokenizers[tokenizer]).toEqual(
            undefined
          );
        });
      }
    );

    test("should update thematicBreak tokenizer", () => {
      const Parser = buildParser(["thematicBreak"], {
        thematicBreak: dummyTokenizer
      });

      setBlockTokenizers(Parser);

      expect(Parser.prototype.blockTokenizers["thematicBreak"]).not.toEqual(
        dummyTokenizer
      );
    });

    test("should add todos tokenizer after list", () => {
      const Parser = buildParser(["list"], {
        list: dummyTokenizer
      });

      setBlockTokenizers(Parser);

      expect(Parser.prototype.blockTokenizers["todos"]).not.toBe(undefined);
      expect(Parser.prototype.blockMethods).toEqual(["list", "todos"]);
    });
  });

  describe("inline tokenizers", () => {
    function buildParser(
      inlineMethods: string[] = [],
      inlineTokenizers: object = {}
    ) {
      function Parser() {}
      Parser.prototype.blockMethods = [];
      Parser.prototype.blockTokenizers = {};
      Parser.prototype.inlineTokenizers = {
        deletion: dummyTokenizer,
        test: dummyTokenizer,
        html: dummyTokenizer,
        ...inlineTokenizers
      };
      Parser.prototype.inlineMethods = [
        "deletion",
        "text",
        "html",
        ...inlineMethods
      ];

      return Parser;
    }

    test("should update deletion tokenizer", () => {
      const Parser = buildParser(["deletion"], {
        deletion: dummyTokenizer
      });

      setInlineTokenizers(Parser);

      expect(Parser.prototype.inlineTokenizers["deletion"]).not.toEqual(
        dummyTokenizer
      );
    });

    test("should update emphasis tokenizer", () => {
      const Parser = buildParser(["emphasis"], {
        emphasis: dummyTokenizer
      });

      setInlineTokenizers(Parser);

      expect(Parser.prototype.inlineTokenizers["emphasis"]).not.toEqual(
        dummyTokenizer
      );
    });

    test("should update strong tokenizer", () => {
      const Parser = buildParser(["strong"], {
        strong: dummyTokenizer
      });

      setInlineTokenizers(Parser);

      expect(Parser.prototype.inlineTokenizers["strong"]).not.toEqual(
        dummyTokenizer
      );
    });

    test("should add highlight tokenizer", () => {
      const Parser = buildParser();

      setInlineTokenizers(Parser);

      expect(Parser.prototype.inlineMethods.join()).toContain(
        ["text", "highlight"].join()
      );
      expect(Parser.prototype.inlineTokenizers["highlight"]).not.toEqual(
        dummyTokenizer
      );
    });

    test("should add hunderline tokenizer", () => {
      const Parser = buildParser();

      setInlineTokenizers(Parser);

      expect(Parser.prototype.inlineMethods.join()).toContain(
        ["deletion", "underline"].join()
      );
      expect(Parser.prototype.inlineTokenizers["underline"]).not.toEqual(
        dummyTokenizer
      );
    });

    test("should remove html tokenizer", () => {
      const Parser = buildParser();

      setInlineTokenizers(Parser);

      expect(Parser.prototype.inlineMethods).not.toContain("html");
      expect(Parser.prototype.inlineTokenizers["html"]).toBe(undefined);
    });
  });
});
