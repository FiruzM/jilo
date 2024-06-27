import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function createSubcategory(data: definitions['models.Subcategories']) {
  return client.post('app/subcategories', {
    json: data,
  }).json()
}
