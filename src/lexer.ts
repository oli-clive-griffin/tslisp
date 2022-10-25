export type Token = (
  | { type: 'number', value: number }
  | { type: 'symbol', value: string }
  | { type: 'string', value: string }
)
export type Item = List | Token
export type List = Item[]

const numberRegex = /^\d+$/
const symbolRegex = /^[a-zA-Z]+$/

export function lex(s: string): Token[] {
  let i = 0

  let tokens: Token[] = []

  while (i < s.length) {
    const c = s[i]

    if (c === ' ') {
      i++
    } else if (c === '(' || c === ')') {
      tokens.push({ type: 'paren', value: c })
      i++
    } else if (c === '"') {
      let string = ''
      while (s[i] !== '"') {
        string += s[i]
        i++
      }
      i++
    } else if (numberRegex.test(c)) {
      let numberString = ''
      while (numberRegex.test(s[i])) {
        numberString += s[i]
        i++
      }
      const number = parseInt(numberString, 10)
      if (number === NaN)
        throw new Error('Invalid number')

      tokens.push({ type: 'number', value: number })
    } else if (symbolRegex.test(c)) {
      let symbol = ''
      while (symbolRegex.test(s[i])) {
        symbol += s[i]
        i++
      }
      tokens.push({ type: 'symbol', value: symbol })
    } else {
      throw new Error('Invalid token')
    }
  }

  return tokens
}
