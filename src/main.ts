import { List, parse } from "./nester"
import { lex, Token } from "./lexer"
import { identity } from "lodash"

const testCases = [
  ['(1 2 3)', [1, 2, 3]],
  ['(1 2 (3 4))', [1, 2, [3, 4]]],
  ['(1 2 (3 4) 5)', [1, 2, [3, 4], 5]],
  ['(1 2 (3 4) 5 (6 7))', [1, 2, [3, 4], 5, [6, 7]]],
  ['(1 2 (3 4) 5 (6 7 (8 9)))', [1, 2, [3, 4], 5, [6, 7, [8, 9]]]],
  ['(1 2 (3 4) 5 (6 7 (8 9) 10) 11)', [1, 2, [3, 4], 5, [6, 7, [8, 9], 10], 11]],
  ['(1 "a" ("b" 4) 5 (6 7 (8 "c") 10) "d")', [1, 2, [3, 4], 5, [6, 7, [8, 9], 10], 11]],
  ['(1 a (b 4) 5 (6 7 (8 c) 10) "d")', [1, 2, [3, 4], 5, [6, 7, [8, 9], 10], 11]],
] as const

function main() {
  for (const testCase of testCases) {
    const [input] = testCase
    const lexed = lex(input)
    // console.log(format(lexed))
    const parsed = parse(lexed)
    console.log(format(parsed))
    // console.assert(JSON.stringify(actual) === JSON.stringify(expected), `Expected ${expected}, got ${actual}`)
  }
}

const format = identity // (o: List | Token[]) => {
//   o

// }

const mapDeep = (f: (x: any) => any, x: any): any => {
  if (Array.isArray(x)) {
    return x.map(y => mapDeep(f, y))
  } else {
    return f(x)
  }
}

main()