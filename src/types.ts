export type ParsedValue = (
  | { type: 'list', value: ParsedList }
  | { type: 'number-literal', value: number }
  | { type: 'string-literal', value: string }
  | { type: 'symbol', value: string }
)
export type ParsedList = ParsedValue[]

// export type OrMacro<T> = T | { macro: }

// | {
//   type: 'function',
//   symbol: string
//   value: (...args: any[]) => any,
// }
// | {
//   type: 'macro',
//   symbol: string
//   value: (...args: SymbolicatedList) => MacroExpandedList,
// }

export type MacroExpandedValue = (
  | { type: 'list', value: MacroExpandedValue[] }
  | { type: 'number-literal'; value: number }
  | { type: 'string-literal', value: string }
  | { type: 'function', value: Function }
)
export type MacroExpandedList = MacroExpandedValue[]
