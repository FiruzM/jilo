import { useAuthUser } from './useAuthUser'
import { type LoginProps, login as loginFunc } from '~/api/auth/login'
import { logout as logoutFunc } from '~/api/auth/logout'
import { currentUser } from '~/api/auth/current-user'
import type { User } from '~/api/types'
import { type CreateRegisterProps, sendRegisterForm } from '~/api/auth/register'

export function useAuth() {
  const authUser = useAuthUser()
  const token = useCookie('token')

  const setUser = (user: User | null) => {
    authUser.value = user
  }

  const me = async () => {
    if (!authUser.value) {
      try {
        const data = await currentUser()

        setUser(data.item)
      }
      catch (error) {
        setUser(null)
      }
    }

    return authUser.value
  }

  const register = async (registerData: CreateRegisterProps) => {
    const data = await sendRegisterForm(registerData)

    token.value = data.token

    return data
  }

  const login = async (loginData: LoginProps) => {
    const data = await loginFunc(loginData)

    token.value = data.token

    return data
  }

  const logout = async () => {
    await logoutFunc()
    setUser(null)
    token.value = null
  }

  return {
    register,
    login,
    logout,
    me,
  }
}
