import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getCategory(id: number) {
  return client.get('app/categories/id', {
    searchParams: {
      id,
    },
  }).json<{ payload: definitions['models.Categories'] }>()
}
