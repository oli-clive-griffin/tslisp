import { Item, List } from "./lexer"

type ResolvedValue = number | string | Function

export const evalulate = (list: List): ResolvedValue => {
  const [head, ...tail] = list.map(item => resolveItem(item)) 

  if (typeof head !== 'function')
    throw new Error(`Expected function, got ${head}`)

  return head(...tail)
}

const resolveItem = (item: Item): ResolvedValue => {
  if (Array.isArray(item))
    return evalulate(item)

  switch (item.type) {
    case 'number':
    case 'string':
      return item.value
    case 'symbol':
      return resolveSymbol(item.value)
  }
}

const resolveSymbol = (symbol: string) => {
  switch (symbol) {
    case 'quote':
      return (...x: any[]) => x
    case '+':
    case 'add':
      return (...args: any[]) => args.reduce((a, b) => a + b, typeof args[0] === 'number' ? 0 : '')
    case '-':
    case 'subtract':
      return (a: number, b: number) => a - b
    default:
      throw new Error(`Unknown symbol ${symbol}`)
  }
}
