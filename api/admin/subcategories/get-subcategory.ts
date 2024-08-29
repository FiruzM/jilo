import type { definitions } from '~/api/v1'

export function getSubcategory(id: string) {
  const client = useApiClient()
  return client.get('app/subcategories/id', {
    searchParams: {
      id,
    },
  }).json<{ payload: definitions['models.Subcategories'] }>()
}
