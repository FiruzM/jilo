import { client } from '~/api/client'

interface Order {
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

export function getOrder(id: number) {
  return client.get(`order`, {
    searchParams: {
      id,
    },
  }).json<{ payload: Order }>()
}
