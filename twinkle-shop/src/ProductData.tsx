export interface IProduct {
  id: number
  name: string
  description: string
  price: number
  reviews: IReview[]
}

export interface IReview {
  comment: string
  reviewer: string
}

export const products: IProduct[] = [
  {
    id: 1,
    name: 'React Router',
    description: 'A collection of navigational components that compose declaratively with you app',
    price: 8,
    reviews: [{
      comment: 'Excellent, this does everything I want',
      reviewer: 'Billy'
    }, {
      comment: 'The best router I ever worked with',
      reviewer: 'Sally'
    }]
  },
  {
    id: 2,
    name: 'React Redux',
    description: 'A library that helps manage state across your app',
    price: 12,
    reviews: [{
      comment: 'I\'ve found this very helpful in the new app I\'m working on',
      reviewer: 'Billy'
    }, {
      comment: 'A bit confusing at first but simple when you get used to it',
      reviewer: 'Sally'
    }]
  },
  {
    id: 3,
    name: 'React Apollo',
    description: 'A library that helps you interact with a GraphQL backend',
    price: 12,
    reviews: [{
      comment: 'I\'ll never work with a rest api again',
      reviewer: 'Billy'
    }, {
      comment: 'It makes working with GraphQL backends a breeze',
      reviewer: 'Sally'
    }]
  }
]

const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => window.setTimeout(resolve, ms))
}

export const getProduct = async (lookupId: number): Promise<IProduct | null> => {
  await wait(2000)
  return products.filter(({ id: productId }) => productId === lookupId).pop() || null
}
