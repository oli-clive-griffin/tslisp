import { ParsedValue } from "./types"

type Token = (
  | { type: 'number-literal', value: number }
  | { type: 'string-literal', value: string }
  | { type: 'symbol', value: string }
  | { type: 'paren', value: '(' | ')' }
)

const numRegex = /^\d/
const whitespaceRegex = /\s/

function fromTokens(tokens: Token[]): ParsedValue[] {
  if (tokens.length === 0) throw new Error()

  if (tokens[0].value !== '(') throw new Error()
  let i = 1

  let list: ParsedValue[] = []

  while (i < tokens.length) {
    const token = tokens[i]

    if (token.type === 'paren') {
      if (token.value === '(') {
        const nested = fromTokens(tokens.slice(i))
        list.push({ type: 'list', value: nested })
        i += nested.length + 2
        continue
      } else {
        return list
      }
    }

    list.push(token) // duck typing
    i += 1
  }

  return list
}

function tokenize(string: string): Token[] {
  const tokens: Token[] = []

  let i = 0
  while (i < string.length) {
    const char = string[i]

    if (whitespaceRegex.test(char)) {
      i++
      continue
    }

    if (char === '(' || char === ')') {
      tokens.push({ type: 'paren', value: char })
      i++
      continue
    }

    if (char === '"') {
      let value = ''
      while (string[++i] !== '"') {
        value += string[i]
      }
      i++
      tokens.push({ type: 'string-literal', value })
      continue
    }

    if (numRegex.test(char)) {
      // use regex to match number
      const value = string.slice(i)?.match(numRegex)?.[0]
      if (value == null) throw new Error()

      const valueLength = value.length
      i += valueLength

      const number = Number(value)
      if (Number.isNaN(number)) throw new Error()
      if (number === Infinity) throw new Error()
      if (number === -Infinity) throw new Error()

      tokens.push({ type: 'number-literal', value: number })
      continue
    }

    let symbolValue = ''
    while (string[i] !== '(' && string[i] !== ')' && !whitespaceRegex.test(string[i])) {
      symbolValue += string[i]
      i++
    }
    tokens.push({ type: 'symbol', value: symbolValue })
  }

  return tokens
}

function test() {
  console.log()

  const tokenised = tokenize(`(abc 2 "asdf" (def 4 2))`)
  console.log(JSON.stringify(tokenised, null, 2))

  const ast = fromTokens(tokenised)
  console.log(JSON.stringify(ast, null, 2))
}

function parse (string: string): ParsedValue[] {
  return fromTokens(tokenize(string))
}

export { parse }
