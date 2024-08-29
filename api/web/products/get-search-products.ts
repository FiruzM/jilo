import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getSearchProduct(name: string) {
  const client = useApiClient()

  return client.get('app/products/all', {
    searchParams: {
      name,
    },
  }).json<{ payload: { data: definitions['models.Products'][], meta: Pagination } }>()
}
