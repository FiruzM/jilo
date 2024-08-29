import type { definitions } from '~/api/v1'

export function updateCategory(data: definitions['models.Categories'], id: string) {
  const client = useApiClient()
  const formData = new FormData()

  formData.append('id', id)
  formData.append('name', data.name as any)
  formData.append('file', data.file as any)

  return client.put('app/categories/id', {
    body: formData,
  }).json()
}
