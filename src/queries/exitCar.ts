/* eslint-disable no-useless-catch */
import { api } from '../api/services/api'

export const updateTransaction = async (plate: string) => {
  try {
    if (!api) {
      throw new Error('A variável de ambiente VITE_API_URL não está definida.')
    }

    const response = await api.put(`/car/update-car/${plate}`)

    console.log(response)
    return response.data
  } catch (error) {
    throw error
  }
}
