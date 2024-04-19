export function sendCode({ code, phone }: { code: string, phone?: string }) {
  const client = useApiClient()

  const codeJson = {
    code: Number(code),
    phone: Number(phone),
  }

  return client.post('verify-sms-code', { json: codeJson }).json()
}
