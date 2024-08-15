import { client } from '~/api/client'
import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getSubcategoryProducts(pageParam: number, id: number, params: any) {
  return client.get('app/products/all', {
    searchParams: {
      subcategory_id: id,
      page: pageParam,
      ...params,
    },
  }).json<{ payload: { data: definitions['models.Products'][], meta: Pagination } }>()
}
