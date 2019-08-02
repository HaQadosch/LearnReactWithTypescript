interface IPerson {
  id: number
  name: string
  age: number
}

type PersonProps = keyof IPerson

class Field2<T, K extends keyof T> {
  name: K;
  label: string;
  defauldValue: T[K];
}

const idField: Field2<IPerson, 'id'> = new Field2()
idField.defauldValue = 2


type ReadPerson = {
  readonly [P in keyof IPerson]: IPerson[P]
}

let billy: Readonly<IPerson> = {
  id: 1,
  name: 'billy',
  age: 3
}

type Stringify<T> = {
  [P in keyof T]: string
}

let tim: Stringify<IPerson> = {
  id: '2',
  name: 'tim',
  age: '4'
}