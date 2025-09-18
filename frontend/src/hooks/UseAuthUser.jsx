import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAuthUser } from '../libs/api.js'

const UseAuthUser = () => {
  const authUser = useQuery({
    queryKey : ["authUser"],
    queryFn : getAuthUser,
    retry : false
  })

  return { isLoading : authUser.isLoading , authUser : authUser.data?.user}
}

export default UseAuthUser