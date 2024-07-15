import { client } from '~/api/client'
import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getDiscountProducts() {
  return client.get('app/products/all', {
    searchParams: {
      discounts: true,
    },
  }).json<{ payload: { data: definitions['models.Products'][], meta: Pagination } } >()
}
