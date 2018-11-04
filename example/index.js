const unified = require("unified");
const createStream = require("unified-stream");
const html = require("remark-html");
const polarbear = require("repolar-parse").default;

const processor = unified()
  .use(polarbear)
  .use(html);

process.stdin.pipe(createStream(processor)).pipe(process.stdout);
