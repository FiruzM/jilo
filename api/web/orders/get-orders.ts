import { stringifyQueryObject } from '~/lib/utils'

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

export function getOrders(data: { page?: number, status_id?: number }) {
  const client = useApiClient()
  const queryParams = stringifyQueryObject(data)

  return client.get(`app/orders/customer${queryParams}`).json<{ payload: Orders[], total: number }>()
}
