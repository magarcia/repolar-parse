"use strict";

import locate from "./locate";
import { EatType } from "../../../types";

const whitespace = require("is-whitespace-character");

const marker = "_";

function underline(eat: EatType, value: string) {
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

        const children = self.tokenizeInline(queue, now);
        return eat(marker + queue + marker)({
          type: "underline",
          data: {
            hName: "u"
          },
          children: children
        });
      }

      queue += marker;
    }

    queue += character;
    index++;
  }
}

underline.locator = locate;

export default underline;
