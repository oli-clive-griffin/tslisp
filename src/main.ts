import { readFileSync } from "fs"
// import { evalulateList } from "./eval"
import { lex } from "./lexer"
import { ParsedList } from "./types"
import { mapDeep } from "./utils/mapDeep"

const testCases = [
  '(add 1 2)',
  '(list 2 3)',
  '(+ 1 2)',
  '(add "con" "cat")',
  '(add (add 2 3) (add 3 4) 10)',
  '(quote 2 3 4.22 5)',
  '(1 2 (3 4) 5 (6 7))',
  '(1 2 (3 4) 5 (6 7 (8 9)))',
  '(1 2 (3 4) 5 (6 7 (8 9) 10) 11)',
  '(1 "a" ("b" 4) 5 (6 7 (8 "c") 10) "d")',
  '(1 a (b 4) 5 (6 7 (8 c) 10) "d")',
]

// const format = (l: ParsedList) => mapDeep(l, (item) => {
//   switch(item.type) {
//     case 'number-literal':
//     case 'string-literal':
//       return item.value
//     case 'symbol':
//       return `<${item.value}>`
//   }
// })

// export function run(string: string) {
//   const lexed = lex(string)
//   const evaled = evalulateList(lexed)
//   return evaled
// }

// function main() {
//   const [,, ...args] = process.argv
//   const file = args[0]
//   const fileContents = readFileSync(file, 'utf8')
//   run(fileContents)
// }

// main()
