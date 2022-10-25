import { pushDeep } from "./pushDeep"

export type Token = (
  | { type: 'number', value: number }
  | { type: 'symbol', value: string }
  | { type: 'string', value: string }
)

export type Item = List | Token
export type List = Item[]

const numberStartRegex = /^\d/
const floatRegex = /^\d+\.\d+/
const symbolRegex = /^[a-zA-Z]+$/

export function lex(s: string): List {
  if (s[0] !== '(' || s[s.length - 1] !== ')') {
    throw new Error(`Expected string to start and end with '(', got ${s}`)
  }

  let i = 1

  let list: List = [];
  let depth = 0

  while (i < s.length) {
    const c = s[i]

    if (c === ' ') {
      i++
    } else if (c === '(') {
      pushDeep([], list, depth)
      depth++
      i++

    } else if (c === ')') {
      depth--
      i++
    } else if (c === '"') {
      let string = ''
      i++ // skip the first "
      while (s[i] !== '"') {
        string += s[i]
        i++
      }
      pushDeep({ type: 'string', value: string }, list, depth)
      i++ // skip the last "

    } else if (numberStartRegex.test(c)) {
      let numberString = ''
      let decimalPointsFound = 0
      while (numberStartRegex.test(s[i]) || s[i] === '.') {
        if (s[i] === '.') {
          decimalPointsFound++
          if (decimalPointsFound > 1) {
            throw new Error(`Expected number, got ${s[i]}`)
          }
        }
        numberString += s[i]
        i++
      }
      const number = parseInt(numberString, 10)
      if (number === NaN)
        throw new Error('Invalid number')

      pushDeep({ type: 'number', value: number }, list, depth)

    } else if (symbolRegex.test(c)) {
      let symbol = ''
      while (symbolRegex.test(s[i])) {
        symbol += s[i]
        i++
      }
      pushDeep({ type: 'symbol', value: symbol }, list, depth)

    } else {
      throw new Error('Invalid token')
    }
  }

  return list
}
