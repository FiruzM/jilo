import { client } from '../client'
import type { definitions } from '../v1'

export function sendRegisterForm(data: definitions['models.UserParams']) {
  return client.post('auth/sign-up', { json: data }).json()
}
