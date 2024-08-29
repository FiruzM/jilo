import type { Pagination } from '~/api/types'
import { stringifyQueryObject } from '~/lib/utils'

interface Reviews {
  full_name: string
  grade: number
  status: string
  created_at: string
  description: string
  id: number
}

interface ReviewProps {
  page?: number | null
}

export function getReviews(data?: ReviewProps) {
  const client = useApiClient()
  const queryParams = stringifyQueryObject(data)
  return client.get(`app/reviews/filter${queryParams}`).json<{ payload: { data: Reviews[], meta: Pagination } }>()
}
