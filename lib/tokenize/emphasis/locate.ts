"use strict";

const slash = "/";

export default function locate(value: string, fromIndex: number): number {
  return value.indexOf(slash, fromIndex);
}
