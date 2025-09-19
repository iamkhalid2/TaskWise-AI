import axiosInstance from "./axios"

export const getAuthUser = async () => {
    try {
        const response = await axiosInstance.get('/auth/checkauth')
        return response.data
    } catch (error) {
        console.log(`Error in getAuthUser api : ${error}`)  
        return null  
    }
}

export const signup = async (signupData) => {
    const response = await axiosInstance.post('/auth/signup',signupData)
    return response.data
}

export const login = async (loginData) => {
    try {
        const res = await axiosInstance.post('/auth/login',loginData)
        return res.data
    } catch (error) {
        console.log(`Error in login api : ${error}`);
    }
}

export const getAllChatHistory = async () => {
    try {
        const res = await axiosInstance.get('/history/get-responses')
        return res.data
    } catch (error) {
        console.log(`Error in getAllchatHistory api : ${error}`);
    }
}

