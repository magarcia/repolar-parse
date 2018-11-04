"use strict";

import locate from "./locate";
import { EatType } from "../../../types";

const whitespace = require("is-whitespace-character");

const marker = "*";

function strong(eat: EatType, value: string) {
  const self = this;
  let index = 1;
  let character = value.charAt(0);
  let now;
  let queue;
  let length;
  let prev;

  if (character !== marker) {
    return;
  }

  length = value.length;
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
          type: "strong",
          children: self.tokenizeInline(queue, now)
        });
      }

      queue += marker;
    }

    queue += character;
    index++;
  }
}

strong.locator = locate;

export default strong;
