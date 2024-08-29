import type { definitions } from '~/api/v1'

export function updateUser(data: definitions['models.AddUserParams'], id: number) {
  const client = useApiClient()
  const formData = new FormData()

  for (const [key, value] of Object.entries(data)) {
    if (value) {
      formData.append(key, value as any)
    }
  }

  formData.append('id', id as any)
  return client.put('admin/users', {
    body: formData,
  }).json()
}
