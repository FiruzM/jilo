import type { definitions } from '~/api/v1'

export function createBrand(data: definitions['models.Brands']) {
  const client = useApiClient()
  return client.post('app/brands', {
    json: data,
  }).json()
}
