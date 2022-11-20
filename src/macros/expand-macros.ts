import { ParsedValue } from "../types"
import { MacroScope } from "./builtin"

export function expandMacros(list: ParsedValue[], scope: MacroScope): ParsedValue[] {
  const [head, ...tail] = list.map(item => item.type === 'list'
    ? { type: 'list', value: expandMacros(item.value, scope) } as const
    : item
  )

  if (head.type !== 'symbol') throw new Error()

  const macro = scope.get(head.value)

  return macro ? macro(...tail) : [head, ...tail]
}