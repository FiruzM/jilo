import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getDiscountProducts() {
  return client.get('app/products/all', {
    searchParams: {
      discounts: true,
    },
  }).json<{ payload: definitions['models.Products'][], total: number } >()
}
