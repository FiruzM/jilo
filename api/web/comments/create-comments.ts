import { client } from '~/api/client'

export interface CommentProps {
  description: string
  grade: number
  user_id?: number
}

export function createComment(data: CommentProps) {
  const formData = new FormData()

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value as any)
  }
  return client.post('app/reviews', { body: formData }).json()
}
