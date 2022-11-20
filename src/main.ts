import { evalulateList } from "./eval"
import { coreMacros } from "./macros/builtin"
import { expandMacros } from "./macros/expand-macros"
import { parse } from "./parser"
import { coreFuncs } from "./symbols/builtin-functions/core"

const sourceString = `
(->> 2
  (+ 9)
  dec
  (* 2)
  (concat "asdf")
)
`

function main() {
  const parsed = parse(sourceString)
  pp({ parsed })

  const expanded = expandMacros(parsed, coreMacros)
  pp({ expanded })

  const evalulated = evalulateList(expanded, coreFuncs)
  pp({ evalulated })
}

function pp(x: any) {
  const [key, value] = Object.entries(x)[0]
  return console.log(key, JSON.stringify(value, null, 2))
}

main()

