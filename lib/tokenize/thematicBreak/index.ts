"use strict";

import { EatType } from "../../../types";

const maxCount = 3;

const marker = "-";
const fence = new Array(maxCount + 1).join(marker);

export default function thematicBreak(eat: EatType, value: string) {
  const subvalue = value.split("\n")[0];
  if (subvalue === fence) {
    return eat(subvalue)({ type: "thematicBreak" });
  } else {
    return;
  }
}
