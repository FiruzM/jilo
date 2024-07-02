import { client } from '~/api/client'

export interface BannerProps {
  title?: string
  subtitle?: string
  banner_link?: string
  banner?: File
}

export function createBanner(data: BannerProps) {
  const formData = new FormData()

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value as any)
  }

  return client.post('app/banners', {
    body: formData,
  }).json()
}
