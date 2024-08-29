import type { definitions } from '../v1'

export function sendRegisterForm(data: definitions['models.UserParams']) {
  const client = useApiClient()
  return client.post('auth/sign-up', { json: data }).json()
}
