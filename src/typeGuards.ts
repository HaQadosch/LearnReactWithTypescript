type StringOrStrings = string | string[]

function first(arg: StringOrStrings): string {
  return typeof arg === 'string' ? arg.substring(0, 1) : Array.isArray(arg) ? arg[0] : null
}

first('The') //?
first(['aauoe', 'b']) //?

interface IPerson {
  id: number
  firstName: string
  lastName: string
}

interface ICompany {
  id: number
  name: string
}

type PersonLaw = IPerson | ICompany

function logName(arg: PersonLaw): string {
  if ('firstName' in arg) {
    return arg.firstName
  } else if ('name' in arg) {
    return arg.name
  } else {
    const nope: never = arg
    return nope
  }
}

function isPerson (arg: PersonLaw): boolean {
  return 'firstName' in arg
}
