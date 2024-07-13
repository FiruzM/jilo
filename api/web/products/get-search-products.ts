import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getSearchProduct(name: string) {
  return client.get('app/products/all', {
    searchParams: {
      name,
    },
  }).json<{ payload: definitions['models.Products'] }>()
}
