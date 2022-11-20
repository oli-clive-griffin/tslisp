import { reverse } from "lodash"
import { lex } from "./lexer"
import { functions } from "./symbols"
import { ParsedValue as ParsedItem, MacroExpandedList, MacroExpandedValue, ParsedList } from "./types"

const macros: Map<string, (...args: any[]) => ParsedList> = new Map([
  ['reverse', reverse]
  // ['->>', ]
])

function expandMacros(list: ParsedList): ParsedList {
  const [head, ...tail] = list.map(item => item.type === 'list'
    ? { type: 'list', value: expandMacros(item.value) } as const
    : item
  )

  if (head.type !== 'symbol') throw new Error()

  const macro = macros.get(head.value)

  return macro ? macro(...tail) : [head, ...tail]
}

// export const evalulateList = (list: ParsedList) => {
//   const [head, ...tail] = list.map(resolveItem)

//   if (head.type !== 'function') throw new Error()

//   return head.value(...tail)
// }

// const resolveItem = (item: ParsedItem): MacroExpandedValue => {
//   if (item.type === 'list') return evalulateList(item.value)
//   if (item.type === 'symbol') {
//     const resolved = functions.get(item.value)
//     if (!resolved) throw new Error()
//     return { type: 'function', value: resolved.value }
//   }
//   return item
// }


const test = `
  (->>)
`

// evalulateList(expandMacros(lex(test)))

function main() {
  console.log()
  console.log(JSON.stringify(lex(test.trim()), null, 2))
}

main()
