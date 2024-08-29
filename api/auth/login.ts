import type { definitions } from '../v1'

export function login(data: definitions['models.UserLogin']) {
  const client = useApiClient()
  return client.post('auth/sign-in', {
    json: data,
  }).json()
}
