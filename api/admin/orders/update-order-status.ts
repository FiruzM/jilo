export interface UpdateOrderStatusProps {
  order_id?: number
  status_id: number
}

export function updateOrderStatus(data: UpdateOrderStatusProps) {
  const client = useApiClient()
  const newData = {
    order_id: data.order_id,
    status_id: data.status_id,
  }

  return client.put('admin/order/status', {
    json: newData,
  }).json()
}
