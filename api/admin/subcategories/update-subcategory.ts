import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function updateSubcategory(data: definitions['models.Subcategories'], id: string) {
  const formData = new FormData()

  formData.append('id', id)
  formData.append('name', data.name as any)
  formData.append('categories_id', Number(data.categories_id) as any)

  return client.put('app/subcategories/id', {
    body: formData,
  }).json()
}
