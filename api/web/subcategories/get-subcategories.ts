import { client } from '~/api/client'
import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getSubcategories(pageParam: number, id: number) {
  return client.get('app/subcategories/all', {
    searchParams: {
      category_id: id,
      page: pageParam,
    },
  }).json<{ payload: { data: definitions['models.Subcategories'][], meta: Pagination } }>()
}
