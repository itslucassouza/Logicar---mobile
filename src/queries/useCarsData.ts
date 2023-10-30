/* eslint-disable no-useless-catch */
import { useQuery } from '@tanstack/react-query'
import { api } from '../api/services/api'

const fetchCarsData = async () => {
  try {
    if (!api) {
      throw new Error('A variável de ambiente VITE_API_URL não está definida.')
    }

    const response = await api.get(`/car`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const useCarsData = () => {
  const { error, data } = useQuery({
    queryKey: ['carData'],
    queryFn: () => fetchCarsData(),
  })

  return {
    data,
    error,
  }
}
