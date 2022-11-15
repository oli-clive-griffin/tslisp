import { LispFunc, LispMacro } from '../types'
import * as coreFunctions from './builtin-functions/core'
import * as coreMacros from '../macros/builtin'

type ResolvedSymbol = (
  | { type: 'func'; value: LispFunc }
  | { type: 'macro'; value: LispMacro }
)

const functions = Object.values(coreFunctions).map(f => [f.symbol, { type: 'func', value: f }] as const)
const macros = Object.values(coreMacros).map(f => [f.symbol, { type: 'macro', value: f }] as const)

export const symbols: Map<string, ResolvedSymbol> = new Map([
  ...functions,
  ...macros,
])