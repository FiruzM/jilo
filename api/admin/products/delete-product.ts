export function deleteProduct(id: number | undefined) {
  const client = useApiClient()
  return client.delete(`app/products/${id}`).json()
}
