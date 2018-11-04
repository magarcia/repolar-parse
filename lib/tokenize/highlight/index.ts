"use strict";

import locate from "./locate";
import { EatType } from "../../../types";

const whitespace = require("is-whitespace-character");

const colon = ":";
const fence = "::";

function highlight(eat: EatType, value: string) {
  const self = this;
  let character = "";
  let previous = "";
  let preceding = "";
  let subvalue = "";
  let index;
  let length;
  let now;

  if (
    value.charAt(0) !== colon ||
    value.charAt(1) !== colon ||
    whitespace(value.charAt(2))
  ) {
    return;
  }

  index = 1;
  length = value.length;
  now = eat.now();
  now.column += 2;
  now.offset += 2;

  while (++index < length) {
    character = value.charAt(index);

    if (
      character === colon &&
      previous === colon &&
      (!preceding || !whitespace(preceding))
    ) {
      return eat(fence + subvalue + fence)({
        type: "highlight",
        data: {
          hName: "mark"
        },
        children: self.tokenizeInline(subvalue, now)
      });
    }

    subvalue += previous;
    preceding = previous;
    previous = character;
  }
}

highlight.locator = locate;

export default highlight;
