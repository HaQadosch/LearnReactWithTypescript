import { PersonLaw } from './typeGuards'

function getData<T>(url: string): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  })
}

getData<PersonLaw>('/person/1').then(person => console.log({ person }))

