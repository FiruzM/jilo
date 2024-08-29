export function deleteSubcategory(id: number | undefined) {
  const client = useApiClient()
  return client.delete(`app/subcategories/${id}`).json()
}
