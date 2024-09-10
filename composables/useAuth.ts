import { useAuthUser } from './useAuthUser'
import { login as loginFunc } from '~/api/auth/login'
import { currentUser } from '~/api/auth/current-user'
import { sendRegisterForm } from '~/api/auth/register'
import type { definitions } from '~/api/v1'

export function useAuth() {
  const authUser = useAuthUser()
  const token = useCookie('token')

  const setUser = (user: definitions['models.AddUserParams'] | null) => {
    authUser.value = user
  }

  const me = async () => {
    if (!authUser.value) {
      try {
        const data: any = await currentUser()
        setUser(data?.payload[0])
      }
      catch {
        setUser(null)
      }
    }

    return authUser.value
  }

  const register = async (registerData: definitions['models.UserParams']) => {
    const data: any = await sendRegisterForm(registerData)
    token.value = data?.payload?.token

    return data
  }

  const login = async (loginData: definitions['models.UserLogin']) => {
    const data: any = await loginFunc(loginData)

    token.value = data?.payload?.token

    return data
  }

  const logout = async () => {
    setUser(null)
    token.value = null
  }

  return {
    setUser,
    register,
    login,
    logout,
    me,
  }
}
