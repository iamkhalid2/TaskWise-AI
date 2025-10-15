import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { signup } from '../libs/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const UseSignup = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  
  const {mutate , isPending , error } = useMutation({
    mutationFn: signup,
    onSuccess: async () => {
        toast.success('Account created successfully!')
        // Wait for auth query to refetch before redirecting
        await queryClient.invalidateQueries({ queryKey : ["authUser"]})
        // Small delay to ensure state updates
        setTimeout(() => navigate('/'), 100)
    },
    onError: (error) => {
        toast.error(error?.response?.data?.message || 'Signup failed')
    }
  })

  return { error , signupMutaion : mutate , isPending }
}

export default UseSignup