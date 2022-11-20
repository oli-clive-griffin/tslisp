import * as coreFunctions from './builtin-functions/core'
import * as coreMacros from '../macros/builtin'

export const functions = new Map(Object.values(coreFunctions).map(f => [f.symbol, { type: 'func', value: f }] as const))
export const macros = Object.values(coreMacros).map(f => [f.symbol, { type: 'macro', value: f }] as const)

// const symbols: ResolvedSymbol[] = [...functions, ...macros]

// export const symbols: Map<string, ResolvedSymbol> = new Map([
//   ...macros,
//   ...functions,
// ])