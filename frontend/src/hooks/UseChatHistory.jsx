import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllChatHistory } from '../libs/api';

const UseChatHistory = () => {
    const history = useQuery({
        queryKey: ['chatHistory'],
        queryFn: getAllChatHistory,
        retry: false,
    });
    
    return { 
        isLoading: history.isLoading, 
        chatHistory: history.data,
        error: history.error 
    };
};

export default UseChatHistory;