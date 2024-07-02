import type { BannerProps } from './create-banner'
import { client } from '~/api/client'

export function updateBanner(data: BannerProps, id: string) {
  const formData = new FormData()

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value as any)
  }

  formData.append('id', id)

  return client.put('app/banners/id', {
    body: formData,
  }).json()
}
