import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function updateBrand(id: number, data: definitions['models.Brands']) {
  const formData = new FormData()

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value as any)
  }

  formData.append('id', id as any)

  return client.put(`app/brands/id`, {
    body: formData,
  }).json()
}
