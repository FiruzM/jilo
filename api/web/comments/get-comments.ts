import { client } from '~/api/client'
import type { Pagination } from '~/api/types'

interface Comments {
  full_name: string
  description: string
  file_path: string
  grade: number
  id: number
}

export function getComments(pageParam: number) {
  return client.get('app/reviews/filter', {
    searchParams: {
      status: 'accepted',
      page: pageParam,
    },
  }).json<{ payload: { data: Comments[], meta: Pagination } }>()
}
