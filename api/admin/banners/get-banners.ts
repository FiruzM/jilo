import qs from 'qs'

export interface Banners {
  id: number
  title: string
  subtitle: string
  banner_link: string
  file_path: string
}

export function getBanners() {
  const client = useApiClient()
  const route = useRoute()
  const searchParams = qs.stringify(route.query, { skipNulls: true })
  return client.get('app/banners/all', {
    searchParams,
  }).json<{ payload: Banners[], total: number }>()
}
