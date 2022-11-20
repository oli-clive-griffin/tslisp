import { isArray } from "lodash"

type RecursiveArray<T> = Array<T | RecursiveArray<T>>

export const mapDeep = <T, R>(arr: RecursiveArray<T>, fn: (item: T) => R): RecursiveArray<R> => (
  arr.map(item => isArray(item)
    ? mapDeep(item, fn)
    : fn(item))
)
