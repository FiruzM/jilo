import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import qs from 'qs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRoleLink(role?: string) {
  if (role === 'user')
    return '/profile'
  if (role === 'super-admin')
    return '/admin/categories'

  return '/'
}

export function stringifyQueryObject(query?: Record<string, any>) {
  return qs.stringify({
    ...query,
  }, {
    skipNulls: true,
    filter: (_prefix: any, value: any) => value || undefined,
    addQueryPrefix: true,
  })
}
