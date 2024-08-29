export interface Roles {
  id: number
  name: string

}
export function getRoles() {
  const client = useApiClient()
  return client.get('app/roles').json<{ payload: Roles[] }>()
}
