import { client } from '../client'
import type { definitions } from '../v1'

export function login(data: definitions['models.UserLogin']) {
  return client.post('auth/sign-in', {
    json: data,
  }).json()
}
