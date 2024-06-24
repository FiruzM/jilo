import ky from "ky"

const token = useLocalStorage('token', null)


export const client = ky.create({
  prefixUrl: 'https://f8f726d3171d.vps.myjino.ru/api/marketplace/v0',
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Authorization', `Bearer ${token.value}`)
      },
    ],
  },
})