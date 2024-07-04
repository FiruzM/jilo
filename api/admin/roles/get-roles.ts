import { client } from '~/api/client'

export interface Roles {
  id: number
  name: string

}
export function getRoles() {
  return client.get('app/roles').json<{ payload: Roles[] }>()
}
