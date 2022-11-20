export type ParsedValue = (
  | { type: 'list', value: ParsedValue[] }
  | { type: 'number-literal', value: number }
  | { type: 'string-literal', value: string }
  | { type: 'symbol', value: string }
)

export type Fun = { type: 'function', value: Function }
export type ResolvedValue = (
  | { type: 'list', value: ResolvedValue[] }
  | { type: 'number-literal'; value: number }
  | { type: 'string-literal', value: string }
  | Fun
)

export type ScopeItem = Function // | Variable | Constant
