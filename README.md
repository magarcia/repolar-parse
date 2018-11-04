# repolar-parse [![Travis][build-badge]][build-status] [![Coverage][coverage-badge]][coverage-status] [![CodeClimate][codeclimate-badge]][codeclimate-status] [![Version][npm-badge]][npm-status] [![Requirements][requirements-badge]][requirements-status]

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

[license]: https://github.com/magarcia/repolar-parse/blob/master/LICENSE
[author]: http://github.com/magarcia
[npm]: https://docs.npmjs.com/cli/install
[unified]: https://github.com/unifiedjs/unified
[mdast]: https://github.com/syntax-tree/mdast
[build-badge]: https://img.shields.io/travis/magarcia/repolar-parse/master.svg
[build-status]: https://travis-ci.org/magarcia/repolar-parse
[coverage-badge]: http://img.shields.io/coveralls/magarcia/repolar-parse.svg?style=flat
[coverage-status]: https://coveralls.io/github/magarcia/repolar-parse
[codeclimate-badge]: https://img.shields.io/codeclimate/issues/magarcia/repolar-parse.svg?style=flat
[codeclimate-status]: https://codeclimate.com/github/magarcia/repolar-parse
[npm-badge]: http://img.shields.io/npm/v/repolar-parse.svg?style=flat
[npm-status]: https://npmjs.org/package/repolar-parse
[requirements-badge]: https://img.shields.io/requires/github/magarcia/repolar-parse.svg
[requirements-status]: https://requires.io/github/magarcia/repolar-parse/requirements/?branch=master
