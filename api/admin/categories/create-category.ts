import type { definitions } from '~/api/v1'

export function createCategory(data: definitions['models.Categories']) {
  const client = useApiClient()
  const formData = new FormData()

  formData.append('name', data.name as any)
  formData.append('file', data.file as any)

  return client.post('app/categories', {
    body: formData,
  }).json()
}
