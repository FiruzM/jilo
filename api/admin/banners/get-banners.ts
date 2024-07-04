import qs from 'qs'
import { client } from '~/api/client'

export interface Banners {
  id: number
  title: string
  subtitle: string
  banner_link: string
  file_path: string
}

export function getBanners() {
  const route = useRoute()
  const searchParams = qs.stringify(route.query, { skipNulls: true })
  return client.get('app/banners/all', {
    searchParams,
  }).json<{ payload: Banners[], total: number }>()
}
