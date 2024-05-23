import { ReactNode } from 'react'

type AlertProps = {
  type: 'success' | 'error'
  children: ReactNode
}

export default function Alert({ type, children }: AlertProps) {
  let color
  let title
  console.log(color)

  switch (type) {
    case 'success':
      color = 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400'
      title = 'success'
      break
    case 'error':
      color = 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400"'
      title = 'error'
      break
  }

  return (
    <div className={'mb-4 rounded-lg p-4 text-sm' + color} role='alert'>
      <span className='font-medium'>{title}</span> {children}
    </div>
  )
}
