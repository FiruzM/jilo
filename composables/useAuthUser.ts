import type { definitions } from '~/api/v1'


export function useAuthUser(): Ref<definitions['models.AddUserParams'] | null> {
  return useState<definitions['models.AddUserParams'] | null>('user', () => null)
}
