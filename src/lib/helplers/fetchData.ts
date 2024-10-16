type FetchOptions = RequestInit & {
  queryParams?: Record<string, string>
}

export const fetchData = async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  try {
    const { queryParams, ...fetchOptions } = options

    const query = new URL(`${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/${url}`)

    if (queryParams) {
      query.search = new URLSearchParams(queryParams).toString()
    }

    const response = await fetch(query, fetchOptions)

    if (!response.ok) {
      let errorMessage = `Error: ${response.status} ${response.statusText}`

      if (response.status >= 400 && response.status < 500) {
        errorMessage = `Client error: ${response.status} ${response.statusText} - Bad request or unauthorized`
      } else if (response.status >= 500) {
        errorMessage = `Server error: ${response.status} ${response.statusText} - Internal server issue`
      }

      throw new Error(errorMessage)
    }

    const data: T = await response.json()

    return data
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message)
    } else throw new Error('An unexpected error occurred during data fetching')
  }
}
