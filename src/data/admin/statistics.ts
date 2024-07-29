type StatisticsData = {
  numberOfOrders: number
  numberOfProducts: number
  numberOfUsers: number
}

export const getStatistics = async () => {
  const response = await fetch('http://localhost:3000/api/admin/statistics', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  const data: StatisticsData = await response.json()

  return data
}
