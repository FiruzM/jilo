interface Order {
  id: number
  total_amount: number
  order_number: string
  created_at: string
  order_items: {
    quantity: number
    id: number
    price: number
    product_name: string
  }[]
  delivery_method: string
  payment_method: string
  status_id: number
  delivery_address: string
  user_name: string
  user_phone: string
  comment: string
}

export function getOrder(id: number) {
  const client = useApiClient()
  return client.get(`order/${id}`).json<{ payload: Order }>()
}
