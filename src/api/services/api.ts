import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://logicar-api.onrender.com',
})
