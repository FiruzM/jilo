export function deleteBrand(id: number | undefined) {
  const client = useApiClient()
  return client.delete(`app/brands/${id}`).json()
}
