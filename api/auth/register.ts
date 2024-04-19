export interface CreateRegisterProps {
  role_name: string
  first_name: string
  last_name: string
  phone: string
  email: string
  password: string
  password_confirmation: string
}

export function sendRegisterForm(data: CreateRegisterProps) {
  const client = useApiClient()

  const form = {
    role_name: data.role_name,
    first_name: data.first_name,
    last_name: data.last_name,
    phone: Number(data.phone),
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation,
  }

  return client.post('register', { json: form }).json<{ error: boolean, token: string }>()
}
