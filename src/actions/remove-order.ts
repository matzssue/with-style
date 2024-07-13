'use server'

export const removeOrder = async (orderId: string) => {
  try {
    const response = await fetch(
      `${process.env.VERCEL_DOMAIN}/api/orders/delete`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
        }),
      }
    )

    const data = await response.json()

    return data
  } catch (error) {
    let message = 'Unknown Error'
    if (error instanceof Error) {
      message = error.message
    }
    return { error: message }
  }
}
