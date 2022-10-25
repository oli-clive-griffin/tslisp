import { pushIntoDepth } from "./pushDeep"

const numberRegex = /^\d+$/

function walk(s: string) {
  if (s[0] !== '(')
    throw new Error('Invalid list')
  if (s[s.length - 1] !== ')')
    throw new Error('Invalid list')
  
  type List = Item[]
  type Item = number | List

  let items: List = []

  let depth = 0
  let state = 'paren'
  let current = ''

  for (const c of s.slice(1)) {
    if (numberRegex.test(c)) {
      state = 'number'
      current += c
    } else if (c === ' ') {
      pushIntoDepth(current, items, depth)
      state = 'space'
      current = ''
    } else if (c === '(') {
      pushIntoDepth([], items, depth)
      state = 'paren'
      depth++
    } else if (c === ')') {
      pushIntoDepth(current, items, depth)
      state = 'paren'
      depth--
    }
  }

  return items
}

// const testCases = [
//   '(1 2 3)',
//   '(1 2 (3 4))',
//   '(1 2 (3 4) 5)',
//   '(1 2 (3 4) 5 6)',
//   '(1 2 (3 4) 5 6 7)',
//   '(1 2 (3 4) 5 6 7 8)',
// ]

// for (const testCase of testCases) {
//   console.log(walk(testCase))
// }