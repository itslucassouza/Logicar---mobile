/* eslint-disable no-useless-catch */
import { api } from '../api/services/api'

interface createCarProps {
  conductorName: string
  color: string
  plate: string
  parkingId: string
}

export const createCar = async (newCarData: createCarProps) => {
  try {
    if (!api) {
      throw new Error('A variável de ambiente VITE_API_URL não está definida.')
    }

    const response = await api.post(`/car`, newCarData)

    return response.data
  } catch (error) {
    throw error
  }
}
