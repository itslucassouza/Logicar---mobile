/* eslint-disable no-useless-catch */
import { useQuery } from '@tanstack/react-query'
import { api } from '../api/services/api'

const fetchDashboardData = async () => {
  try {
    if (!api) {
      throw new Error('A variável de ambiente VITE_API_URL não está definida.')
    }

    const response = await api.get(`/transaction`)

    return response.data
  } catch (error) {
    throw error
  }
}

export const useDashboardData = () => {
  const { error, data } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: () => fetchDashboardData(),
  })

  return {
    data,
    error,
  }
}
