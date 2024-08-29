import qs from 'qs'
import type { Pagination } from '~/api/types'
import type { definitions } from '~/api/v1'

export function getSubcategories() {
  const client = useApiClient()
  const route = useRoute()
  const searchParams = qs.stringify(route.query, { skipNulls: true })

  return client.get('app/subcategories/all', {
    searchParams,
  }).json<{ payload: { data: definitions['models.Subcategories'][], meta: Pagination } }>()
}
