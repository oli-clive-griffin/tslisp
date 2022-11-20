const coreFuncs = new Map([
  // math
  ['+', (...args: any[]) => args.reduce((a, b) => a + b)],
  ['-', (...args: any[]) => args.reduce((a, b) => a - b)],
  ['*', (...args: any[]) => args.reduce((a, b) => a * b)],
  ['/', (...args: any[]) => args.reduce((a, b) => a / b)],
  ['inc', (a: number) => a + 1],
  ['dec', (a: number) => a - 1],

  // list
  ['list', (...x: any[]) => x],
  ['cons', (a: any, b: any) => [a, b]],
  ['car', (a: any) => a[0]],
  ['cdr', (a: any) => a[1]],
  ['length', (a: any) => a.length],

  // string
  ['concat', (...args: any[]) => args.join('')],
  ['split', (a: string, b: string) => a.split(b)],
  ['join', (a: string, b: string[]) => b.join(a)],

  // util
  ['apply', (a: any, b: any) => a(...b)],
])

export { coreFuncs }