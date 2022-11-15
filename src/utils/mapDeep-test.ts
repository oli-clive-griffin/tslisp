import { mapDeep } from "./mapDeep"

const test = () => {
  const input =    [1, 2, [3, 4], 5, [[6, 7], 8], [9, [10, 11], 12], [[[13], 14]]]
  const expected = [2, 3, [4, 5], 6, [[7, 8], 9], [10, [11, 12], 13], [[[14], 15]]]

  const res = mapDeep(input, (n: number) => n + 1)

  const expectedTestString = JSON.stringify(expected)
  const resTestString = JSON.stringify(res)

  if (resTestString !== expectedTestString) {
    throw new Error(`
      failed.
      Expected: ${expectedTestString}
      got:      ${resTestString}
    `)
  }

  console.log("passed")
}

test()
