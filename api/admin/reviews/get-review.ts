interface Review {
  full_name: string
  grade: number
  status: string
  created_at: string
  description: string
  id: number
}

export function getReview(id: number) {
  const client = useApiClient()
  return client.get(`app/reviews/by/${id}`).json<{ payload: Review }>()
}
