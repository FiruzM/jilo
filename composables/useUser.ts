export function useUser() {
    const authUser = useAuthUser()
  
    return computed(() => {
      if (!authUser.value)
        return false
  
      return authUser.value?.role?.name === 'user'
    })
  }
  