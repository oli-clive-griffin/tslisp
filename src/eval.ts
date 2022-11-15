import { symbols } from "./symbols"
import { Item, List } from "./types"
import { mapDeep } from "./utils/mapDeep"

type ResolvedValue = number | string | Function



// const expandMacros = (list: List) => {
//   const [head, ...tail] = list

//   // const resolvedHead = resolve(head) head.type === 'list') 
// }

export const evalulateList = (list: List): ResolvedValue => {
  const [head, ...tail] = list.map(item => resolveItem(item)) 

  if (typeof head !== 'function') // this is not actually correct, we should be able to resolve a function here
    throw new Error(`Expected function, got ${head}`)

  return head(...tail)
}

const resolveItem = (item: Item): ResolvedValue => {
  switch (item.type) {
    case 'list':
      return evalulateList(item.value)
    case 'symbol':
      return resolveSymbol(item.value)
    case 'number':
    case 'string':
      return item.value
  }
}

const resolveSymbol = (symbol: string) => {
  const value = symbols.get(symbol)
  if (value === undefined)
    throw new Error(`Unknown symbol: ${symbol}`)
  return value
}
