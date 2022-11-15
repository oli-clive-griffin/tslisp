import { readFileSync } from "fs"
import { evalulateList } from "./eval"
import { lex, List } from "./lexer"

// const testCases = [
//   '(add 1 2)',
//   '(list 2 3)',
//   '(+ 1 2)',
//   '(add "con" "cat")',
//   '(add (add 2 3) (add 3 4) 10)',
//   '(quote 2 3 4.22 5)',
//   // '(1 2 (3 4) 5 (6 7))',
//   // '(1 2 (3 4) 5 (6 7 (8 9)))',
//   // '(1 2 (3 4) 5 (6 7 (8 9) 10) 11)',
//   // '(1 "a" ("b" 4) 5 (6 7 (8 "c") 10) "d")',
//   // '(1 a (b 4) 5 (6 7 (8 c) 10) "d")',
// ]

const format = (l: List) => mapDeep(l, (item) => {
  switch(item.type) {
    case 'number':
    case 'string':
      return item.value
    case 'symbol':
      return '<' + item.value + '>'
  }
})

const mapDeep = (x: any[], f: (x: any) => any): any => {
  if (Array.isArray(x)) {
    return x.map(y => mapDeep(y, f))
  } else {
    return f(x)
  }
}

export function run(string: string) {
  const lexed = lex(string)
  const evaled = evalulateList(lexed)
  return evaled
}

function main() {
  const [,, ...args] = process.argv
  const file = args[0]
  const fileContents = readFileSync(file, 'utf8')
  run(fileContents)
}

// main()
