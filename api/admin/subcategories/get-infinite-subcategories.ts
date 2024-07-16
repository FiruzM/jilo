import { client } from '~/api/client'
import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getInfiniteSubcategories(pageParam: number) {
  return client.get('app/subcategories/all', {
    searchParams: {
      page: pageParam,
    },
  }).json<{ payload: { data: definitions['models.Subcategories'][], meta: Pagination } }>()
}
