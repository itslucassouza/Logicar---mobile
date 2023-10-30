/* eslint-disable no-useless-catch */
import { api } from '../api/services/api'

interface signinProps {
  name: string
  password: number
}

export const signin = async (signinData: signinProps) => {
  try {
    if (!api) {
      throw new Error('A variável de ambiente VITE_API_URL não está definida.')
    }

    const response = await api.post(`/users/signin`, signinData)

    return response.data
  } catch (error) {
    throw error
  }
}
