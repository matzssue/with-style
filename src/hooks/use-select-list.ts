'use client'
import { useEffect, useState } from 'react'

export const useSelectList = <T>(
  list: T[],
  filterFn: (item: T, searchValue: string) => boolean
) => {
  const [searchValue, setSearchValue] = useState('')
  const [listData, setListData] = useState<T[]>(list)

  const searchValueHandler = (value: string) => {
    setSearchValue(value)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filteredItems = list.filter((item) => filterFn(item, searchValue))
      const selectedProducts = searchValue === '' ? list : filteredItems
      setListData(selectedProducts)
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [searchValue, list, filterFn])

  return { searchValueHandler, listData, searchValue }
}
