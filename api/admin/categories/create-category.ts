import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function createCategory(data: definitions['models.Categories']) {
  return client.post('app/categories', {
    json: data,
  }).json()
}
