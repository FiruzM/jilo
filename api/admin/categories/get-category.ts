import type { definitions } from '~/api/v1'

export function getCategory(id: string) {
  const client = useApiClient()
  return client.get('app/categories/id', {
    searchParams: {
      id,
    },
  }).json<{ payload: definitions['models.Categories'] }>()
}
