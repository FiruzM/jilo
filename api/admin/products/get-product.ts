import type { definitions } from '~/api/v1'

export function getProduct(id: number) {
  const client = useApiClient()
  return client.get('app/products/id', {
    searchParams: {
      id,
    },
  }).json<{ payload: definitions['models.Products'] }>()
}
