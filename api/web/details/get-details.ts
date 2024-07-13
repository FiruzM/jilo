import { client } from '~/api/client'

interface Categories {
  name: string
  id: number
  subcategories: {
    name: string
    id: number
    brands: {
      name: string
      id: number
    }[]
  }[]

}
export function getDetails() {
  return client.get('app/details/all').json<{ payload: { categories: Categories[] } }>()
}
