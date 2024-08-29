import type { definitions } from '../v1'

export function currentUser() {
  const client = useApiClient()
  return client.get('profile/users').json<definitions['models.AddUserParams']>()
}
