import type { definitions } from '~/api/v1'

export function getUser(id: number) {
  const client = useApiClient()
  return client.get('users', {
    searchParams: {
      id,
    },
  }).json<{ payload: definitions['models.AddUserParams'] }>()
}
