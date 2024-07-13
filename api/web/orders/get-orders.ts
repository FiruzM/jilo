import { client } from '~/api/client'

interface Orders {
  id: number
  total_amount: number
  order_number: string
  created_at: string
  order_items: {
    quantity: number
  }[]
  delivery_method: string
  payment_method: string
  status_id: number
}

export function getOrders() {
  return client.get('app/orders/customer').json<{ payload: Orders[] }>()
}
