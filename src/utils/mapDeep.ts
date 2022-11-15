import { isArray } from "lodash"

export const mapDeep = (arr: any[], fn: Function): any[] => (
  arr.map(item => isArray(item)
    ? mapDeep(item, fn)
    : fn(item))
)

