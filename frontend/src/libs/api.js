import axiosInstance from "./axios"
import { DEMO_MODE, mockUser, mockChatHistory, mockLogin, mockSignup } from "./mockData"

export const getAuthUser = async () => {
    // Demo mode: return mock user if logged in
    if (DEMO_MODE) {
        const isLoggedIn = localStorage.getItem('demo_logged_in') === 'true';
        return isLoggedIn ? { success: true, user: mockUser } : null;
    }
    
    try {
        const response = await axiosInstance.get('/auth/checkauth')
        return response.data
    } catch (error) {
        console.log(`Error in getAuthUser api : ${error}`)  
        return null  
    }
}

export const signup = async (signupData) => {
    // Demo mode: simulate signup
    if (DEMO_MODE) {
        localStorage.setItem('demo_logged_in', 'true');
        return mockSignup(signupData);
    }
    
    const response = await axiosInstance.post('/auth/signup',signupData)
    return response.data
}

export const login = async (loginData) => {
    // Demo mode: simulate login
    if (DEMO_MODE) {
        localStorage.setItem('demo_logged_in', 'true');
        return mockLogin(loginData);
    }
    
    try {
        const res = await axiosInstance.post('/auth/login',loginData)
        return res.data
    } catch (error) {
        console.log(`Error in login api : ${error}`);
    }
}

export const getAllChatHistory = async () => {
    // Demo mode: return mock chat history
    if (DEMO_MODE) {
        return mockChatHistory;
    }
    
    try {
        const res = await axiosInstance.get('/history/get-responses')
        return res.data
    } catch (error) {
        console.log(`Error in getAllchatHistory api : ${error}`);
    }
}

