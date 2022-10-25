import { Token } from "./lexer"
import { pushIntoDepth } from "./pushDeep"

// export type Item = List | Token
// export type List = Item[]

export function nest(tokens: Token[]) {
  if (tokens.length === 0)
    throw new Error("No tokens")
  if (tokens[0].type !== "paren")
    throw new Error("Expected paren")
  if (tokens[0].value !== "(")
    throw new Error("Expected open paren")

  let items: List = []
  const restTokens = tokens.slice(1);

  let depth = 0

  for (const token of restTokens) {
    switch(token.type) {
      case 'paren': {
        if (token.value === '(') {
          pushIntoDepth([], items, depth)
          depth++
        } else {
          depth--
        }
        break
      }
      case 'number':
      case 'string':
      case 'symbol': {
        pushIntoDepth(token, items, depth)
      }
    }
  }

  return items
}
