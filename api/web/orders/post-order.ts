export function postOrder(data: any) {
  const client = useApiClient()
  return client.post('app/order', { json: { ...data, total_amount: Number(data.total_amount) } }).json()
}
