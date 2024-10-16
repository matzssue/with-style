import { fetchData } from '@/lib/helplers/fetchData'
import { adminRoutes } from '@/routes'
type StatisticsData = {
  title: string
  quantity: number
}
export const getStatistics = async (): Promise<StatisticsData> => {
  const statistics = await fetchData<StatisticsData>(
    `api/${adminRoutes.statistics}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return statistics
}
