import axios from 'axios'

const axiosInstance = axios.create({
    baseUrl : "http://localhost:3001/api",
    withCredentials : true,
})

export default axiosInstance