import axios from './axios.js'

export const RegisterRequest = user => axios.post(`/register`, user)

export const LoginRequest = user => axios.post(`/login`, user)

export const verifyTokenRequest = () => axios.get(`/verify`)
