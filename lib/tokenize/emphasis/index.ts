"use strict";

import locate from "./locate";
import { EatType } from "../../../types";

const whitespace = require("is-whitespace-character");

const marker = "/";

function emphasis(eat: EatType, value: string) {
  const self = this;
  let index = 0;
  let character = value.charAt(index);
  let now;
  let queue;
  let length;
  let prev;

  if (character !== marker) {
    return;
  }

  length = value.length;
  index++;
  queue = "";
  character = "";

  if (whitespace(value.charAt(index))) {
    return;
  }

  while (index < length) {
    prev = character;
    character = value.charAt(index);

    if (character === marker && !whitespace(prev)) {
      character = value.charAt(++index);

      if (character !== marker) {
        if (!queue.trim() || prev === marker) {
          return;
        }

        now = eat.now();
        now.column++;
        now.offset++;

        return eat(marker + queue + marker)({
          type: "emphasis",
          children: self.tokenizeInline(queue, now)
        });
      }

      queue += marker;
    }

    queue += character;
    index++;
  }
}

emphasis.locator = locate;
export default emphasis;
