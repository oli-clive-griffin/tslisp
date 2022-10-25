import { evalulate } from "./eval"
import { lex, List } from "./lexer"

const testCases = [
  '(quote 2 3)',
  '(add 1 2)',
  '(+ 1 2)',
  // '(add "con" "cat")',
  // '(add (add 2 3) (add 3 4))',
  // '(quote 2 3 4.22 5)',
  // '(1 2 (3 4) 5 (6 7))',
  // '(1 2 (3 4) 5 (6 7 (8 9)))',
  // '(1 2 (3 4) 5 (6 7 (8 9) 10) 11)',
  // '(1 "a" ("b" 4) 5 (6 7 (8 "c") 10) "d")',
  // '(1 a (b 4) 5 (6 7 (8 c) 10) "d")',
]

function main() {
  for (const testCase of testCases) {

    const lexed = lex(testCase)
    console.log(format(lexed))

    const evaled = evalulate(lexed)
    console.log(evaled)
  }
}

const format = (l: List) => mapDeep(l, (item) => {
  switch(item.type) {
    case 'number':
    case 'string':
      return item.value
    case 'symbol':
      // return Symbol(item.value);
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

// make mapDeep generic
// make mapDeep work with nested arrays

// const mapDeep = <T, U>(f: (x: T | T[]) => U | U[], x: T[]): (U | U[])[] => {
//   if (Array.isArray(x)) {
//     return x.map(y => mapDeep(f, y))
//   } else {
//     return f(x)
//   }
// }


main()