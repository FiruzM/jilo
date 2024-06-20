import { client } from '../client'
import type { definitions } from '../v1'

export function currentUser() {
  return client.get('admin/users').json<definitions['models.AddUserParams']>()
}
