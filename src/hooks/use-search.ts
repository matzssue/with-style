import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useSearch = (path: string) => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (value: string) => {
    setSearchValue(value)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchValue) {
        router.push(`/${path}?search=${searchValue}`)
      } else {
        router.push(`/${path}`)
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchValue, path, router])
  return { handleSearch }
}
