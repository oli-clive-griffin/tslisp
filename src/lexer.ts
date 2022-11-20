import { ParsedList } from "./types";
import { pushDeep } from "./utils/pushDeep"

const numberRegex = /^\d/

export function lex(s: string): ParsedList {
  if (s[0] !== '(' || s[s.length - 1] !== ')') {
    throw new Error(`Expected string to start with '(' and end with ')', got ${s[0]} and ${s[s.length - 1]}`)
  }

  let i = 1

  let list: ParsedList = [];
  let depth = 0

  while (i < s.length) {
    if (s[i] === ' ') {
      i++
    } else if (s[i] === '(') {
      pushDeep([], list, depth) // todo this breaks the whole thing
      depth++
      i++

    } else if (s[i] === ')') {
      depth--
      i++
    } else if (s[i] === '"') {
      let string = ''
      i++ // skip the first "
      while (s[i] !== '"') {
        string += s[i]
        i++
      }
      pushDeep({ type: 'string', value: string }, list, depth)
      i++ // skip the last "

    } else if (numberRegex.test(s[i])) {
      let numberString = ''
      let decimalPointsFound = 0
      while (numberRegex.test(s[i]) || s[i] === '.') {
        if (s[i] === '.') {
          decimalPointsFound++
          if (decimalPointsFound > 1) {
            throw new Error(`Expected number, got ${s[i]}`)
          }
        }
        numberString += s[i]
        i++
      }
      const number = decimalPointsFound === 0 ? parseInt(numberString, 10) : parseFloat(numberString)
      if (number === NaN)
        throw new Error('Invalid number')

      pushDeep({ type: 'number', value: number }, list, depth)

    } else if (s[i] !== " ") {

      let symbol = '' // these two checks are a good example of why this should be a state machine
      while (s[i] != null && s[i] !== ' ' && s[i] !== '(' && s[i] !== ')') {
        symbol += s[i]
        i++
      }
      pushDeep({ type: 'symbol', value: symbol }, list, depth)

    } else {
      throw new Error('Invalid token')
    }
  }

  return list; //  mapDeep(list)
}

