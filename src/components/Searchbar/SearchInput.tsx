import { ChangeEvent } from 'react'
import { Input } from '../ui/input'

export const SearchInput = ({
  value,
  setSearchValue,
  title,
  placeholder,
}: {
  value: string
  setSearchValue: (value: string) => void
  title: string
  placeholder: string
}) => {
  return (
    <div className='flex flex-col gap-3'>
      <label className='text-2xl font-bold'>{title}</label>
      <Input
        type='search'
        value={value ?? ''}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
        id='searchInput'
        placeholder={placeholder}
        style={{ maxWidth: '700px' }}
      />
    </div>
  )
}
