export function sendSms(phone: string) {
  const client = useApiClient()

  const phoneJson = {
    phone: Number(phone),
  }

  return client.post('send-sms', { json: phoneJson }).json()
}
