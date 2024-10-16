import { getCookies } from '@/lib/auth/sessionCookies'
import { fetchData } from '@/lib/helplers/fetchData'
import { adminRoutes, userRoutes } from '@/routes'
import { OrderData } from '@/types/orders'

type QueryParams = {
  orderId?: string
}

export const getOrder = async (
  orderId: string,
  adminOrder: boolean = false
): Promise<OrderData> => {
  const queryParams: QueryParams = {}

  if (orderId) queryParams.orderId = orderId

  const selectedUrl = adminOrder
    ? `api/${adminRoutes.orderDetails}/${orderId}`
    : `api/${userRoutes.orderDetails}/${orderId}`

  const order = await fetchData<OrderData>(selectedUrl, {
    queryParams: queryParams,
    headers: {
      'Content-Type': 'application/json',
      Cookie: getCookies(),
    },
    cache: 'no-cache',
  })

  return order
}
