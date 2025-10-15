import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../libs/axios';
import { DEMO_MODE, mockDualResponse, mockUser } from '../libs/mockData';

const sendDualPrompt = async (prompt) => {
    // Demo mode: return mock response
    if (DEMO_MODE) {
        // Simulate credit deduction
        const currentCredits = mockUser.credits;
        if (currentCredits > 0) {
            mockUser.credits -= 1;
        }
        return mockDualResponse(prompt);
    }
    
    const response = await axiosInstance.post('/dual-ai/dual-query', { prompt });
    return response.data;
};

const UseDualAI = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: sendDualPrompt,
        onSuccess: () => {
            // Invalidate chat history to refetch
            queryClient.invalidateQueries({ queryKey: ['chatHistory'] });
            // Update auth user to reflect credit change
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        },
        onError: (error) => {
            console.error('Error sending dual prompt:', error);
        }
    });

    return {
        sendPrompt: mutation.mutate,
        isLoading: mutation.isPending,
        error: mutation.error,
        data: mutation.data,
        reset: mutation.reset
    };
};

export default UseDualAI;
