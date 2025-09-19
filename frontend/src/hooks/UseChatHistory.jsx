import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllChatHistory } from '../libs/api'

const UseChatHistory = () => {
    const history = useQuery({
        queryKey:['chatHistory'],
        queryFn: getAllChatHistory,
    })
    return { isloading: history.isLoading , history  }
}

export default UseChatHistory