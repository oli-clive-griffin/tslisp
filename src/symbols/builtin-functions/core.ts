import { LispFunc } from "../../types"

// math
export const add: LispFunc = {
  symbol: '+',
  value: (...args: any[]) => args.reduce((a, b) => a + b)
}
export const subtract: LispFunc = {
  symbol: '-',
  value: (...args: any[]) => args.reduce((a, b) => a - b)
}
export const multiply: LispFunc = {
  symbol: '*',
  value: (...args: any[]) => args.reduce((a, b) => a * b)
}
export const divide: LispFunc = {
  symbol: '/',
  value: (...args: any[]) => args.reduce((a, b) => a / b)
}

// list
export const list: LispFunc = {
  symbol: 'list',
  value: (...x: any[]) => x
}
export const cons: LispFunc = {
  symbol: 'cons',
  value: (a: any, b: any) => [a, b]
}
export const car: LispFunc = {
  symbol: 'car',
  value: (a: any) => a[0]
}
export const cdr: LispFunc = {
  symbol: 'cdr',
  value: (a: any) => a[1]
}
export const length: LispFunc = {
  symbol: 'length',
  value: (a: any) => a.length
}

