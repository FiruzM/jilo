import { getRoleLink } from '~/lib/utils'

export default defineNuxtRouteMiddleware(async () => {
  const isAdmin = useAdmin()
  const user = useAuthUser()

  if (!user.value)
    return navigateTo({ path: '/login' })

  const roleName = user.value.role.name

  if (!isAdmin.value) {
    return showError({
      statusCode: 404,
      statusMessage: 'Page not found',
      data: {
        homeLink: getRoleLink(roleName),
      },
    })
  }
})
