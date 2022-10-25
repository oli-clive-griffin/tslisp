import { pushIntoDepth } from "./pushDeep"

export type Token = (
  | { type: 'number', value: number }
  | { type: 'symbol', value: string }
  | { type: 'string', value: string }
)
export type Item = List | Token
export type List = Item[]

const numberRegex = /^\d+$/
const symbolRegex = /^[a-zA-Z]+$/

export function lex(s: string): List {
  let i = 0

  let list: List = [];
  let depth = 0

  while (i < s.length) {
    const c = s[i]

    if (c === ' ') {
      i++
    } else if (c === '(') {
      pushIntoDepth([], list, depth)
      i++

    } else if (c === ')') {
      depth--
      i++
    } else if (c === '"') {
      let string = ''
      while (s[i] !== '"') {
        string += s[i]
        i++
      }
      i++ // skip the closing quote

    } else if (numberRegex.test(c)) {
      let numberString = ''
      while (numberRegex.test(s[i])) {
        numberString += s[i]
        i++
      }
      const number = parseInt(numberString, 10)
      if (number === NaN)
        throw new Error('Invalid number')

      pushIntoDepth({ type: 'number', value: number }, list, depth)

    } else if (symbolRegex.test(c)) {
      let symbol = ''
      while (symbolRegex.test(s[i])) {
        symbol += s[i]
        i++
      }
      pushIntoDepth({ type: 'symbol', value: symbol }, list, depth)

    } else {
      throw new Error('Invalid token')
    }
  }

  return list
}
