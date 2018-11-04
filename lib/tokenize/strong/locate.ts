"use strict";

const asterisk = "*";

export default function locate(value: string, fromIndex: number): number {
  return value.indexOf(asterisk, fromIndex);
}
