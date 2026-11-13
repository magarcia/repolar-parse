import unified = require("unified");
import markdown = require("remark-parse");
import html = require("remark-html");
import repolar, {
  repolar as namedRepolar,
  setBlockTokenizers,
  setInlineTokenizers
} from "./index";

describe("runtime compatibility", () => {
  test("supports the default and named unified plugins", () => {
    const input = "# Heading\n\n*strong* /emphasis/ ~deleted~";

    expect(unified().use(repolar).parse(input)).toEqual(
      unified().use(namedRepolar).parse(input)
    );
  });

  test("supports configuring the legacy Parser with the public helpers", () => {
    const input = "# Heading\n\n* item\n\n/one/ *two* ~three~";
    const processor = unified()
      .use(markdown, { commonmark: true })
      .use(function configureTokenizers() {
        setBlockTokenizers(this.Parser);
        setInlineTokenizers(this.Parser);
      });

    expect(processor.parse(input)).toEqual(unified().use(repolar).parse(input));
  });

  test("allows downstream plugins to extend the Parser tokenizers", () => {
    const processor = unified()
      .use(repolar)
      .use(function configureTokenizers() {
        delete this.Parser.prototype.inlineTokenizers.emphasis;
        const methods: string[] = this.Parser.prototype.inlineMethods;
        methods.splice(methods.indexOf("emphasis"), 1);
      });

    expect(processor.parse("/plain/")).toMatchObject({
      children: [
        { type: "paragraph", children: [{ type: "text", value: "/plain/" }] }
      ]
    });
    expect(unified().use(repolar).parse("/plain/")).toMatchObject({
      children: [{ type: "paragraph", children: [{ type: "emphasis" }] }]
    });
  });

  test("compiles with the separately installed safe CommonJS HTML plugin", () => {
    const processor = unified().use(repolar).use(html);

    expect(String(processor.processSync("*strong* /emphasis/"))).toBe(
      "<p><strong>strong</strong> <em>emphasis</em></p>\n"
    );
    expect(String(processor.processSync('<script>alert("xss")</script>'))).toBe(
      ""
    );
    expect(String(processor.processSync("[unsafe](javascript:alert)"))).toBe(
      "<p><a>unsafe</a></p>\n"
    );
  });

  test.each(["mailto:", "MAILTO:"])("preserves %s autolinks", prefix => {
    const tree = unified().use(repolar).parse(`Contact ${prefix}foo@bar.com.`);

    expect(tree).toMatchObject({
      children: [
        {
          type: "paragraph",
          children: [
            { type: "text", value: "Contact " },
            {
              type: "link",
              children: [{ type: "text", value: "foo@bar.com" }]
            },
            { type: "text", value: "." }
          ]
        }
      ]
    });
  });

  test("keeps mailto text inside links and inline code", () => {
    const input =
      "[mailto:foo@bar.com](https://example.com) `mailto:foo@bar.com`";

    expect(unified().use(repolar).parse(input)).toMatchObject({
      children: [
        {
          type: "paragraph",
          children: [
            {
              type: "link",
              children: [{ type: "text", value: "mailto:foo@bar.com" }]
            },
            { type: "text", value: " " },
            { type: "inlineCode", value: "mailto:foo@bar.com" }
          ]
        }
      ]
    });
  });

  test("preserves mailto offsets after Unicode text", () => {
    const text = "İ Contact ";

    expect(
      unified().use(repolar).parse(`${text}mailto:foo@bar.com`)
    ).toMatchObject({
      children: [
        {
          children: [
            { type: "text", value: text },
            {
              type: "link",
              url: "mailto:foo@bar.com",
              position: {
                start: { offset: text.length, column: text.length + 1 }
              }
            }
          ]
        }
      ]
    });
  });
});
