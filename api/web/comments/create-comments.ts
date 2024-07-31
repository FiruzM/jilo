import { client } from '~/api/client'

export interface CommentProps {
  description: string
  grade: number
  user_id?: number
}

export function createComment(data: CommentProps) {
  return client.post('app/reviews', { json: data }).json()
}
