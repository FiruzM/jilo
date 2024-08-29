import type { Banners } from './get-banners'

export function getBanner(id: number) {
  const client = useApiClient()
  return client.get('app/banners/id', {
    searchParams: {
      id,
    },
  }).json<{ payload: Banners }>()
}
