import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getBrands(pageParam: number, id: number) {
  const client = useApiClient()
  return client.get('app/brands/all', {
    searchParams: {
      subcategory_id: id,
      page: pageParam,
    },
  }).json<{ payload: { data: definitions['models.Brands'][], meta: Pagination } }>()
}
