import { client } from '~/api/client'

interface Order {
  id: number
  total_amount: number
  order_number: string
  created_at: string
  order_items: {
    quantity: number
    id: number
    price: number
  }[]
  delivery_method: string
  payment_method: string
  status_id: number
  delivery_address: string
}

export function getOrder(id: number) {
  return client.get(`order/${id}`).json<{ payload: Order }>()
}
