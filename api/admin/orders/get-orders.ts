import qs from 'qs'

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
  user_name: string
}

export function getAdminOrders() {
  const client = useApiClient()
  const route = useRoute()
  const searchParams = qs.stringify(route.query, { skipNulls: true })

  return client.get('admin/orders', {
    searchParams,
  }).json<{ payload: Orders[], total: number }>()
}
