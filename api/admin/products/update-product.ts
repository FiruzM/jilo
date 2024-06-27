import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function updateProduct(data: definitions['models.Products'], id: number) {
  const formData = new FormData()

  for (const [key, value] of Object.entries(data)) {
    if (key !== 'file_paths') {
      formData.append(key, value as any)
    }
  }

  if (data.file_paths) {
    data.file_paths!.forEach((data) => {
      formData.append('files', data)
    })
  }

  formData.append('id', id.toString())

  return client.put(`app/products/${id}`, {
    body: formData,
  }).json()
}
