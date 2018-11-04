# repolar-parse

Parser for [**unified**][unified]. Parses [Polar Bear markup language](https://bear.app/faq/Markup%20:%20Markdown/Polar%20Bear%20markup%20language/) to an
[**MDAST**][mdast] syntax tree.

## Installation

[npm][]:

```sh
npm install repolar-parse
```

## Usage

```js
var unified = require("unified");
var createStream = require("unified-stream");
var polarbear = require("repolar-parse").default;
var html = require("remark-html");

var processor = unified()
  .use(polarbear)
  .use(html);

process.stdin.pipe(createStream(processor)).pipe(process.stdout);
```

## License

[MIT][license] © [Martin Garcia][author]

<!-- Definitions -->

[license]: https://github.com/magarcia/repolar/blob/master/license
[author]: http://github.com/magarcia
[npm]: https://docs.npmjs.com/cli/install
[unified]: https://github.com/unifiedjs/unified
[mdast]: https://github.com/syntax-tree/mdast
