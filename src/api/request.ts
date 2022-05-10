import axios from 'axios'

// @ts-ignore
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000
})

// @ts-ignore
request.interceptors.request.use((config) => {
  return config
}, // @ts-ignore
    (error) => {
  return Promise.reject(error)
})

// @ts-ignore
request.interceptors.response.use((response) => {
  return response.data
}, // @ts-ignore
    (error) => {
  return Promise.reject(error)
})

export default request