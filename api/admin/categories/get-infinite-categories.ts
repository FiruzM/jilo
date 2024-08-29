import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getInfiniteCategories(pageParam: number) {
  const client = useApiClient()
  return client.get('app/categories/all', {
    searchParams: {
      page: pageParam,
    },
  }).json<{ payload: { data: definitions['models.Categories'][], meta: Pagination } }>()
}
