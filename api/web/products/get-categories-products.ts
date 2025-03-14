import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getCategoriesProducts(pageParam: number, id: number, params?: any) {
  const client = useApiClient()

  return client.get('app/products/all', {
    searchParams: {
      category_id: id,
      page: pageParam,
      ...params,
    },
  }).json<{ payload: { data: definitions['models.Products'][], meta: Pagination } }>()
}
