// math
export const add = {
  symbol: '+',
  value: (...args: any[]) => args.reduce((a, b) => a + b)
}
export const subtract = {
  symbol: '-',
  value: (...args: any[]) => args.reduce((a, b) => a - b)
}
export const multiply = {
  symbol: '*',
  value: (...args: any[]) => args.reduce((a, b) => a * b)
}
export const divide = {
  symbol: '/',
  value: (...args: any[]) => args.reduce((a, b) => a / b)
}

// list
export const list = {
  symbol: 'list',
  value: (...x: any[]) => x
}
export const cons = {
  symbol: 'cons',
  value: (a: any, b: any) => [a, b]
}
export const car = {
  symbol: 'car',
  value: (a: any) => a[0]
}
export const cdr = {
  symbol: 'cdr',
  value: (a: any) => a[1]
}
export const length = {
  symbol: 'length',
  value: (a: any) => a.length
}

