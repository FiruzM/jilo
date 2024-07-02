import type { Banners } from './get-banners'
import { client } from '~/api/client'

export function getBanner(id: number) {
  return client.get('app/banners/id', {
    searchParams: {
      id,
    },
  }).json<{ payload: Banners }>()
}
