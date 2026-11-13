import { EatType } from "../../../types";

const prefix = "mailto:";

function mailto(eat: EatType, value: string, silent?: boolean) {
  if (value.slice(0, prefix.length).toLowerCase() !== prefix) return;

  const eatEmail: EatType = (content: string) =>
    eat(value.slice(0, prefix.length) + content);
  eatEmail.now = eat.now;

  return this.inlineTokenizers.email.call(
    this,
    eatEmail,
    value.slice(prefix.length),
    silent
  );
}

mailto.locator = (value: string, fromIndex: number): number => {
  const expression = /mailto:/gi;
  expression.lastIndex = fromIndex;
  const match = expression.exec(value);
  return match ? match.index : -1;
};
mailto.notInLink = true;

export default mailto;
