import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getBrands() {
  return client.get('app/brands/all').json<{ payload: definitions['models.Brands'][], total: number }>()
}
