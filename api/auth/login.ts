export interface LoginProps {
  email: string
  password: string
}

export function login(data: LoginProps) {
  const client = useApiClient()

  return client.post('login', { json: data }).json<{
    error: boolean
    token: string
  }>()
}
