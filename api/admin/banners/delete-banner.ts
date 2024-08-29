export function deleteBanner(id: number | undefined) {
  const client = useApiClient()
  return client.delete(`app/banners/${id}`).json()
}
