interface Orders {
  id: number
  total_amount: number
  order_number: string
  created_at: string
  user_phone: string
  order_items: {
    quantity: number
  }[]
  delivery_method: string
  payment_method: string
  status_id: number
  user_name: string
}

export function getUnpaidOrders() {
  const client = useApiClient()
  return client.get('admin/orders', {
    searchParams: {
      status_id: 1,
      size: 100,
    },
  }).json<{ payload: Orders[], total: number }>()
}
