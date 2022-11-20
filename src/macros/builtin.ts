import { ParsedValue } from "../types"
import { reverse } from "lodash"
// a macro takes the .value property of a list Value and returns a new list of Values
export type MacroScope = Map<string, (...args: ParsedValue[]) => ParsedValue[]>

export const coreMacros: MacroScope = new Map([
  ['reverse', (...args) => reverse(args)],
  ['->>', (initialValue, ...expressions): ParsedValue[] => {
    const combine = (acc: ParsedValue, expr: ParsedValue): ParsedValue => {
      const newList = expr.type === 'list' ? expr.value : [expr]

      return {
        type: 'list',
        value: [newList[0], acc, ...(newList.slice(1))]
      }
    }

    const finalExpr = expressions.reduce<ParsedValue>(combine, initialValue)
    if (finalExpr.type !== 'list') throw new Error()
    return finalExpr.value
  }],
])
