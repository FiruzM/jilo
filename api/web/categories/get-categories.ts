import type { definitions } from '~/api/v1'

export function getCategories() {
  const client = useApiClient()
  return client.get('app/categories/all').json<{ payload: definitions['models.Categories'][], total: number }>()
}
