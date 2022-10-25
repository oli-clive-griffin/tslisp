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
      if (state === 'number') {
        pushIntoDepth(parseInt(current, 10), items, depth)
      }
      state = 'space'
      current = ''
    } else if (c === '(') {
      if (state !== 'space')
        throw new Error('fuck')

      pushIntoDepth([], items, depth)
      state = 'paren'
      current = ''
      depth++
    } else if (c === ')') {
      if (state === 'number') {
        pushIntoDepth(parseInt(current, 10), items, depth)
      }
      state = 'paren'
      current = ''
      depth--
    }
  }

  return items
}

const testCases = [
  ['(1 2 3)', [1, 2, 3]],
  ['(1 2 (3 4))', [1, 2, [3, 4]]],
  ['(1 2 (3 4) 5)', [1, 2, [3, 4], 5]],
  ['(1 2 (3 4) 5 (6 7))', [1, 2, [3, 4], 5, [6, 7]]],
  ['(1 2 (3 4) 5 (6 7 (8 9)))', [1, 2, [3, 4], 5, [6, 7, [8, 9]]]],
  ['(1 2 (3 4) 5 (6 7 (8 9) 10) 11)', [1, 2, [3, 4], 5, [6, 7, [8, 9], 10], 11]],
] as const

for (const testCase of testCases) {
  const [input, expected] = testCase
  const actual = walk(input)
  console.assert(JSON.stringify(actual) === JSON.stringify(expected), `Expected ${expected}, got ${actual}`)
}