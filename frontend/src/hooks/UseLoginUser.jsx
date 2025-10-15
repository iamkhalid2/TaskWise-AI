import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { login } from '../libs/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const UseLoginUser = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  
  const { mutate , error , isPending } = useMutation({
    mutationFn:login,
    onSuccess: async () => {
        toast.success(`Successfully logged in!`)
        // Wait for auth query to refetch before redirecting
        await queryClient.invalidateQueries({ queryKey : ["authUser"]})
        // Small delay to ensure state updates
        setTimeout(() => navigate('/'), 100)
    },
    onError: (error) => {
        toast.error(error?.response?.data?.message || 'Login failed')
    }
  })
  
  return { error , isPending , loginMutation: mutate}
}

export default UseLoginUser