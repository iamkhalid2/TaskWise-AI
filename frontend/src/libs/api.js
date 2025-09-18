import axiosInstance from "./axios"

export const getAuthUser = async () => {
    const response = await axiosInstance.get('/auth/checkauth')
    return response.data
}

export const signup = async (signupData) => {
    const response = await axiosInstance.post('/auth/signup',signupData)
    return response.data
}

