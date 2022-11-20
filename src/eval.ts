
import { parse } from "./parser"
import { ParsedValue, ScopeItem } from "./types"
import { coreFuncs } from './symbols/builtin-functions/core'
import { expandMacros } from "./macros/expand-macros"

type Scope = Map<string, ScopeItem>

export const evalulateList = (list: ParsedValue[], scope: Scope): any => {
  const [head, ...tail] = list.map(val => resolveItem(val, scope))

  return head(...tail)
}

const resolveItem = (item: ParsedValue, scope: Scope) => {
  switch(item.type) {
    case 'list': return evalulateList(item.value, scope)
    case 'symbol': {
      const resolved = scope.get(item.value)
      if (!resolved) throw new Error()
      return resolved
    }
    default: return item.value
  }
}
