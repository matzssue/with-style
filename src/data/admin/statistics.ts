import { fetchData } from '@/lib/helplers/fetchData'
import { adminRoutes } from '@/routes'
import { headers } from 'next/headers'
type StatisticsData = {
  title: string
  quantity: number
}
export const getStatistics = async (): Promise<StatisticsData[]> => {
  const statistics = await fetchData<StatisticsData[]>(
    `api/${adminRoutes.statistics}`,
    {
      method: 'GET',
      headers: new Headers(headers()),
    }
  )

  return statistics
}
