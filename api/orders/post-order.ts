import { client } from '../client'

export function postOrder(data: any) {
  return client.post('app/order', { json: { ...data, total_amount: Number(data.total_amount) } }).json()
}
