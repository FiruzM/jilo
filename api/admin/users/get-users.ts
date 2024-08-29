import qs from 'qs'
import type { definitions } from '~/api/v1'

export function getUsers() {
  const client = useApiClient()
  const route = useRoute()
  const searchParams = qs.stringify(route.query, { skipNulls: true })

  return client.get('admin/users', {
    searchParams,
  }).json<{ payload: definitions['models.AddUserParams'][], total: number }>()
}
