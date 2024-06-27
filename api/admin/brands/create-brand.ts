import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function createBrand(data: definitions['models.Brands']) {
  return client.post('app/brands', {
    json: data,
  }).json()
}
