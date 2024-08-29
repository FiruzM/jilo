import type { definitions } from '~/api/v1'

export function createSubcategory(data: definitions['models.Subcategories']) {
  const client = useApiClient()
  return client.post('app/subcategories', {
    json: {
      ...data,
      categories_id: Number(data.categories_id),
    },
  }).json()
}
