"use strict";
const whitespace = require("is-whitespace-character");
import locate from "./locate";
import { EatType } from "../../../types";

const marker = "-";
const fence = marker;

function strikethrough(eat: EatType, value: string) {
  const self = this;
  let character = "";
  let previous = "";
  let preceding = "";
  let subvalue = "";
  let index;
  let length;
  let now;

  if (value.charAt(0) !== marker || whitespace(value.charAt(1))) {
    return;
  }

  index = 0;
  length = value.length;
  now = eat.now();
  now.column += 1;
  now.offset += 1;

  while (++index < length) {
    const isLastCharacter = index + 1 === length;
    character = value.charAt(index);

    if (
      ((whitespace(character) && previous === marker) ||
        (character === marker && isLastCharacter)) &&
      (!preceding || !whitespace(preceding))
    ) {
      if (isLastCharacter) subvalue += previous;
      return eat(fence + subvalue + fence)({
        type: "delete",
        children: self.tokenizeInline(subvalue, now)
      });
    }

    subvalue += previous;
    preceding = previous;
    previous = character;
  }
  return;
}

strikethrough.locator = locate;

export default strikethrough;
