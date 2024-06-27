import { getRoleLink } from '~/lib/utils'

export default defineNuxtRouteMiddleware(async () => {
  const user = useAuthUser()

  const roleName = user.value?.role?.name

  if (user.value)
    return navigateTo({ path: getRoleLink(roleName) })
})
