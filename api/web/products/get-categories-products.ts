import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getCategoriesProducts(id: number) {
  return client.get('app/products/all', {
    searchParams: {
      category_id: id,
    },
  }).json<{ payload: definitions['models.Products'][], total: number }>()
}
