export interface IProduct {
  id: number
  name: string
  description: string
  price: number
}

export const products: IProduct[] = [
  {
    id: 1,
    name: 'React Router',
    description: 'A collection of navigational components that compose declaratively with you app',
    price: 8
  },
  {
    id: 2,
    name: 'React Redux',
    description: 'A library that helps manage state across your app',
    price: 12
  },
  {
    id: 3,
    name: 'React Apollo',
    description: 'A library that helps you interact with a GraphQL backend',
    price: 12
  }
]
