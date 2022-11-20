// control flow

import { range } from "lodash"
import { LispMacro, List } from "../types"

export const let_: LispMacro = {
  symbol: 'let',
  value: (...list: List) => {
    const [substitutions, expr] = list

    if (substitutions.type !== 'list') throw new Error('`let` body must be an array')
    const substitutionsList = substitutions.value

    if (!(substitutionsList.length % 2 !== 0)) throw new Error('`let` body must be an array of even length')

    const substitutionsMap = new Map(range(substitutionsList.length / 2).map(i => {
      const [key, value] = substitutionsList.slice(i, 1+2)

      if (key.type !== 'symbol') throw new Error('key must be a symbol')

      return [key, value]
    }))

    const processSymbol = (t: Token) => {

      if (t.type !== 'symbol') return t

      const sub = substitutionsMap.get(t.value)
      if (t.value)
    }

    return mapDeep(expr, )
  }
}

