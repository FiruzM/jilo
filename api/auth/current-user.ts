import type { User } from '../types'

export interface JSONSchema {
  error: boolean
  item: User
}

export function currentUser() {
  const client = useApiClient()

  return client.get('user').json<JSONSchema>()
}
