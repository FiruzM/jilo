import { client } from '~/api/client'
import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getInfiniteBrands(pageParam: number) {
  return client.get('app/brands/all', {
    searchParams: {
      page: pageParam,
    },
  }).json<{ payload: { data: definitions['models.Brands'][], meta: Pagination } }>()
}
