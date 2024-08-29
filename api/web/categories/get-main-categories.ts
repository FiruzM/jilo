import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getMainCategories() {
  const client = useApiClient()
  return client.get('app/categories/all', {
    searchParams: {
      size: 100,
    },
  }).json<{ payload: { data: definitions['models.Categories'][], meta: Pagination } }>()
}
