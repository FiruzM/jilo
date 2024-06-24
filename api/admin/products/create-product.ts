import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function createProduct(data: definitions['models.Products']) {
  const formData = new FormData()

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value as any)
  }

  return client.post('app/products', {
    body: formData,
  }).json()
}
