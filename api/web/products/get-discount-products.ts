import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getDiscountProducts(pageParam: number) {
  const client = useApiClient()

  return client.get('app/products/all', {
    searchParams: {
      discounts: true,
      page: pageParam,
    },
  }).json<{ payload: { data: definitions['models.Products'][], meta: Pagination } } >()
}
