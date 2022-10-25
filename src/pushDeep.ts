import { range } from "lodash"

export function pushDeep(item: any, arr: any[], depth: number) {
  let innermost = arr
  for (const _ of range(depth)) {
    innermost = innermost[innermost.length - 1]
  }
  innermost.push(item)
}

// for (const testCase of [
//   ['a',    [1,[2,[3,[4]]]],    0],
//   ['a',    [1,[2,[3,[4]]]],    1],
//   ['a',    [1,[2,[3,[4]]]],    2],
//   ['a',    [1,[2,[3,[4]]]],    3],
// ] as const) {
//   const [item, arr, depth] = testCase
//   const array = [...arr]
//   pushIntoDepth(item, array, depth)
//   console.log(JSON.stringify(array))
//   console.log('' )
// }
