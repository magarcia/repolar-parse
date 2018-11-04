import {
  strikethrough,
  emphasis,
  strong,
  underline,
  highlight,
  thematicBreak,
  list,
  todos
} from "./lib/tokenize";

const remark = require("remark-parse");

export function repolar() {
  remark.call(this, { commonmark: true });

  setBlockTokenizers(this.Parser);
  setInlineTokenizers(this.Parser);
}

export function setBlockTokenizers(Parser: any) {
  const tokenizers = Parser.prototype.blockTokenizers;
  const methods = Parser.prototype.blockMethods;

  const toRemove = [
    "setextHeading",
    "definition",
    "footnote",
    "indentedCode",
    "table"
  ];

  for (let tokenizer of toRemove) {
    delete tokenizers[tokenizer];
    if (methods.indexOf(tokenizer) >= 0)
      methods.splice(methods.indexOf(tokenizer), 1);
  }

  tokenizers.thematicBreak = thematicBreak;
  tokenizers.list = list;

  tokenizers.todos = todos;
  methods.splice(methods.indexOf("list") + 1, 0, "todos");
}

export function setInlineTokenizers(Parser: any) {
  const tokenizers = Parser.prototype.inlineTokenizers;
  const methods = Parser.prototype.inlineMethods;

  tokenizers.emphasis = emphasis;
  tokenizers.strong = strong;
  tokenizers.deletion = strikethrough;

  tokenizers.highlight = highlight;
  methods.splice(methods.indexOf("text") + 1, 0, "highlight");
  tokenizers.underline = underline;
  methods.splice(methods.indexOf("deletion") + 1, 0, "underline");

  delete tokenizers.html;
  methods.splice(methods.indexOf("html"), 1);
}

export default repolar;
