export const getSubcategoryTitles = async () => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/products/subcategory/titles`
    )

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (err) {
    throw new Error('Error getting subcategory titles')
  }
}
