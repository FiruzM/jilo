import { client } from '~/api/client'

export function deleteReview(id: number) {
  return client.delete(`app/reviews/${id}`).json()
}
