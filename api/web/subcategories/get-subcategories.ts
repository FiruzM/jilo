import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getSubcategories(id: number) {
  return client.get('app/subcategories/all', {
    searchParams: {
      category_id: id,
    },
  }).json<{ payload: definitions['models.Subcategories'][], total: number }>()
}
