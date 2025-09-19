import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { signup } from '../libs/api'


const UseSignup = () => {
  const queryClient = useQueryClient()
  const {mutate , isPending , error } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey : ["authUser"]})
  })

  return { error , signupMutaion : mutate , isPending }
}

export default UseSignup