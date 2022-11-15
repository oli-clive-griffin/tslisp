export type Token = (
  | { type: 'number', value: number }
  | { type: 'symbol', value: string }
  | { type: 'string', value: string }
)

export type Item = (
  | { type: 'list', value: List }
  | Token
)

export type List = Item[]

export type Symbol = (
  | { type: 'macro', macro: LispMacro }
  | { type: 'func', macro: LispFunc }
)

export type LispFunc = {
  symbol: string
  value: (...args: any[]) => any
}

export type LispMacro = {
  symbol: string
  value: (...args: List) => List
}