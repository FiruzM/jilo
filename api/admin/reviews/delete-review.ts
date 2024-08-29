export function deleteReview(id: number) {
  const client = useApiClient()
  return client.delete(`app/reviews/${id}`).json()
}
