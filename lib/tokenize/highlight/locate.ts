"use strict";

const mark = "::";

export default function locate(value: string, fromIndex: number): number {
  return value.indexOf(mark, fromIndex);
}
