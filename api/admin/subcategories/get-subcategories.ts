import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getSubcategories() {
  return client.get('app/subcategories/all').json<{ payload: definitions['models.Subcategories'][] }>()
}
