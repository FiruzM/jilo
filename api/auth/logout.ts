export function logout() {
  const client = useApiClient()

  return client.post('logout').json()
}
