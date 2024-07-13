import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getSubcategoryProducts(id: number) {
  return client.get('app/products/all', {
    searchParams: {
      subcategory_id: id,
    },
  }).json<{ payload: definitions['models.Products'][], total: number }>()
}
