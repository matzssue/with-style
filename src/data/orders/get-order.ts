import { getCookies } from '@/lib/auth/sessionCookies'
import { fetchData } from '@/lib/helplers/fetchData'
import { userRoutes } from '@/routes'
import { OrderData } from '@/types/orders'

type QueryParams = {
  orderId?: string
}

export const getOrder = async (orderId: string): Promise<OrderData> => {
  const queryParams: QueryParams = {}

  if (orderId) queryParams.orderId = orderId

  const order = await fetchData<OrderData>(
    `api/${userRoutes.orderDetails}/${orderId}`,
    {
      queryParams: queryParams,
      headers: {
        'Content-Type': 'application/json',
        Cookie: getCookies(),
      },
      cache: 'no-cache',
    }
  )

  return order
}
