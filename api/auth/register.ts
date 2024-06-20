import { client } from '../client'
import type { definitions } from '../v1'

export function sendRegisterForm(data: definitions['models.UserParams']) {
  const form = {
    email: data.email,
    full_name: data.full_name,
    password: data.password,
    repeat_password: data.repeat_password,
    number_phone: data.number_phone,
  }

  return client.post('/auth/sign-up', {
    
    json: form ,
  }).json()
}
