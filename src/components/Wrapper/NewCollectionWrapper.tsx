import { HTMLProps, ReactNode } from 'react'

export const NewCollectionWrapper = ({
  children,
  className,
}: {
  children: ReactNode
  className?: HTMLProps<HTMLElement>['className']
}) => {
  const baseClass: HTMLProps<HTMLElement>['className'] =
    'flex flex-col w-full items-center justify-evenly py-4 gap-4'
  const combinedClass = `${baseClass} ${className}`
  return <div className={combinedClass}>{children}</div>
}
