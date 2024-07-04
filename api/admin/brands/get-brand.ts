import {client} from '~/api/client'
import type { definitions } from '~/api/v1'

export function getBrand(id: number) {
    return client.get('app/brands/id', {
        searchParams: {
            id
        }
    }).json<{ payload: definitions['models.Brands'] }>()
}