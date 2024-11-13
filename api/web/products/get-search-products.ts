import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getSearchProduct(search: string) {
  const client = useApiClient()

  return client.get('app/products/all', {
    searchParams: {
      search,
    },
  }).json<{ payload: { data: definitions['models.Products'][], meta: Pagination } }>()
}
