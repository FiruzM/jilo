import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getBrands(id: number) {
  return client.get('app/brands/all', {
    searchParams: {
      subcategory_id: id,
    },
  }).json<{ payload: definitions['models.Brands'][], total: number }>()
}
