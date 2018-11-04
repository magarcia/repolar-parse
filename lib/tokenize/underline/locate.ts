"use strict";

const lowdash = "_";

export default function locate(value: string, fromIndex: number): number {
  return value.indexOf(lowdash, fromIndex);
}
