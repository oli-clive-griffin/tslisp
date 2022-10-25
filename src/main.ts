import { lex, List, Token } from "./lexer"
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
    console.log(format(lexed))
    // console.assert(JSON.stringify(actual) === JSON.stringify(expected), `Expected ${expected}, got ${actual}`)
  }
}

const format = (l: List) => mapDeep((item) => {
  switch(item.type) {
    case 'number':
    case 'string':
      return item.value
    case 'symbol':
      return Symbol(item.value);
  }
}, l)

const mapDeep = (f: (x: any) => any, x: any[]): any => {
  if (Array.isArray(x)) {
    return x.map(y => mapDeep(f, y))
  } else {
    return f(x)
  }
}

// make mapDeep generic
// make mapDeep work with nested arrays

// const mapDeep = <T, U>(f: (x: T | T[]) => U | U[], x: T[]): (U | U[])[] => {
//   if (Array.isArray(x)) {
//     return x.map(y => mapDeep(f, y))
//   } else {
//     return f(x)
//   }
// }


main()