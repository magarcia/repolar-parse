"use strict";

const dash = "-";

export default function locate(value: string, fromIndex: number): number {
  return value.indexOf(dash, fromIndex);
}
