import { client } from '~/api/client'
import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getBrands() {
  return client.get('app/brands/all').json<{ payload: { data: definitions['models.Brands'][], meta: Pagination } }>()
}
