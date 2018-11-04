"use strict";

import { EatType, Position } from "../../../types";
import { takeWhile, map } from "../../utils";

const lineFeed = "\n";
const todoFence = "- ";
const doneFence = "+ ";

export default function todos(eat: EatType, value: string) {
  const lines: string[] = value.split(lineFeed);
  const items: string[] = takeWhile(
    lines,
    line => line.indexOf(todoFence) === 0 || line.indexOf(doneFence) === 0
  );
  const children: object[] = map(items, item =>
    buildListItem(this, item, eat.now())
  );

  const subvalue = items.join(lineFeed);
  if (subvalue.trim() === "") return;

  return eat(subvalue)({
    type: "list",
    ordered: false,
    children: children
  });
}

function buildListItem(ctx: any, item: string, position: Position): object {
  const isChecked: boolean = item.indexOf(doneFence) >= 0;
  const fence: string = isChecked ? doneFence : todoFence;
  return {
    type: "listItem",
    checked: isChecked,
    children: ctx.tokenizeBlock(item.slice(item.indexOf(fence) + 2), position)
  };
}
