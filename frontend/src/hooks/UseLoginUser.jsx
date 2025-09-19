import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { login } from '../libs/api'
import toast from 'react-hot-toast'

const UseLoginUser = () => {
  const queryClient = useQueryClient()
  const { mutate , error , isPending } = useMutation({
    mutationFn:login,
    onSuccess: () => {
        toast.success(`successfully login`)
        queryClient.invalidateQueries({ queryKey : ["authUser"]})
    }
  })
  
  return { error , isPending , loginMutation: mutate}
}

export default UseLoginUser