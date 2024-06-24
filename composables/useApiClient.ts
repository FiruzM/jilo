import ky from 'ky'
import { getRoleLink } from '~/lib/utils'

export function useApiClient() {
  const runtimeConfig = useRuntimeConfig()

  const user = useAuthUser()
  const token = useCookie('token')

  return ky.create({
    prefixUrl: `${runtimeConfig.public.apiBase}/api`,

    headers: {
      ...(!!token.value) && { Authorization: `Bearer ${token.value}` },
    },

    hooks: {
      afterResponse: [
        async (_request, _options, response) => {
          const responseData = await response.json()

          if (response.status === 404) {
            showError({
              statusCode: 404,
              statusMessage: 'Not Found',
              data: {
                homeLink: getRoleLink(user.value?.role?.name),
              },
            })
          }

          if (responseData.error)
            return new Response(JSON.stringify(responseData), { status: 417 })
        },
      ],
    },
  })
}
