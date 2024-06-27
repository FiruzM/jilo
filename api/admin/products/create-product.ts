import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function createProduct(data: definitions['models.Products']) {
  const formData = new FormData()

  for (const [key, value] of Object.entries(data)) {
    if (key !== 'file_paths') {
      formData.append(key, value as any)
    }
  }

  data.file_paths!.forEach((data) => {
    formData.append('files', data)
  })

  return client.post('app/products', {
    body: formData,
  }).json()
}