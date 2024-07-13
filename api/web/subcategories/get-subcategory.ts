import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getSubcategory(id: number) {
  return client.get('app/subcategories/id', {
    searchParams: {
      id,
    },
  }).json<{ payload: definitions['models.Categories'] }>()
}
