import { client } from '../client'
import type { definitions } from '../v1'

export function currentUser() {
  return client.get('profile/users').json<definitions['models.AddUserParams']>()
}
