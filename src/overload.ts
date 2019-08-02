function condenseString (arg: string): string {
  return arg.split(' ').join('')
}

function condenseArray (args: string[]): string[] {
  return args.map(condenseString)
}



function condense (arg: string): string
function condense (args: string[]): string[]
function condense (arg: string | string[]): string | string[] {
  return typeof arg === 'string' ? condenseString(arg) : condenseArray(arg)
}

const cond = condense('o e .') //?

