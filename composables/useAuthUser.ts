import type { User } from '~/api/types'

export function useAuthUser(): Ref<User | null> {
  return useState<User | null>('user', () => (
    {
      id: 1,
      first_name: 'admin',
      last_name: 'admin',
      phone: '1234567890',
      email: 'admin@admin.com',
      role: 'admin',
      is_verified: 1,
      type: 'legal_person',
    }
  ))
}
