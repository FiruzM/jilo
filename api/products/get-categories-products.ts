import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getCategoriesProducts() {
  return client.get('app/products/all').json<{ payload: definitions['models.Products'][] }>()
}
