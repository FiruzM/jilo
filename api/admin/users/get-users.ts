import qs from 'qs'
import { client } from '~/api/client'
import type { definitions } from '~/api/v1'

export function getUsers() {
  const route = useRoute()
  const searchParams = qs.stringify(route.query, { skipNulls: true })

  return client.get('admin/users', {
    searchParams,
  }).json<{ payload: definitions['models.AddUserParams'][], total: number }>()
}
