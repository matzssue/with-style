type StatisticsData = {
  title: string
  quantity: number
}

export const getStatistics = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/admin/statistics`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const data: StatisticsData[] = await response.json()

  return data
}
