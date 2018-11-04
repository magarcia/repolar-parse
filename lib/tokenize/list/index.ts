import { EatType, Position } from "../../../types";
import { takeWhile, map, isDecimal } from "../../utils";

const lineFeed = "\n";
const bulletExpression: RegExp = /^(\*|\d\.) (.*)/;

export default function list(eat: EatType, value: string) {
  const lines: string[] = value.split(lineFeed);
  const items: string[] = takeWhile(lines, line => bulletExpression.test(line));
  const children: object[] = map(items, item =>
    buildListItem(this, item, eat.now())
  );

  const subvalue = items.join(lineFeed);
  if (subvalue.trim() === "") return;

  const match = items[0].match(bulletExpression);
  if (match === null) return;
  const index = match[1].charAt(0);
  const ordered = isDecimal(index);

  return eat(subvalue)({
    type: "list",
    ordered: ordered,
    start: ordered && index !== "1" ? index : undefined,
    children: children
  });
}

function buildListItem(ctx: any, item: string, position: Position): object {
  const match = item.match(bulletExpression);
  if (match === null) return {};

  return {
    type: "listItem",
    children: ctx.tokenizeBlock(match[2], position)
  };
}
