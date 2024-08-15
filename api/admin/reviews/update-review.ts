import { client } from '~/api/client'

export interface ReviewProps {
  full_name?: string | undefined
  grade?: number
  status: string
  created_at?: string | undefined
  description?: string | undefined
  id?: number | undefined
}
export function updateReview(data: ReviewProps) {
  const formData = new FormData()

  formData.append('status', data.status)
  formData.append('id', data.id!.toString() )
  formData.append('grade', data.grade as any)
  formData.append('description', data.description!)

  return client.put('app/reviews/update/id', {
    body: formData,
  }).json()
}
