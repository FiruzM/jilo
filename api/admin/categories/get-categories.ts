import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getCategories() {
  return client.get('app/categories/all').json<{ payload: definitions['models.Categories'][] }>()
}
