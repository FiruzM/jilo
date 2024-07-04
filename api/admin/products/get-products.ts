import qs from 'qs'
import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getProducts() {
  const route = useRoute()
  const searchParams = qs.stringify(route.query, { skipNulls: true })

  return client.get('app/products/all', {
    searchParams,
  }).json<{ payload: definitions['models.Products'][], total: number }>()
}
