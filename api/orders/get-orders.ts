import { client } from '../client'

export function getOrders() {
  return client.get('app/orders/customer').json()
}
