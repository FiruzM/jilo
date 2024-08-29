export function deleteCategory(id: number | undefined) {
  const client = useApiClient()
  return client.delete(`app/categories/${id}`).json()
}
