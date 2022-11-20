import * as coreFunctions from './builtin-functions/core'
import { Fun } from '../types'


export { coreFunctions }
// export const functions:  = new Map<string, Fun>(Object.values(coreFunctions).map((f): [string, Fun] =>
//   [
//     f.symbol,
//     {
//       type: 'function',
//       value: f.value,
//     }
//   ]
// ))

// export const macros = new Object.values(coreMacros).map(f => [f.symbol, { type: 'macro', value: f }] as const)

// const symbols: ResolvedSymbol[] = [...functions, ...macros]

// export const symbols: Map<string, ResolvedSymbol> = new Map([
//   ...macros,
//   ...functions,
// ])