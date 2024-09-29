import Link from 'next/link'
import { ReactNode } from 'react'

export const ButtonLink = ({
  children,
  href,
  style,
}: {
  children: ReactNode
  href: string
  style?: React.CSSProperties
}) => {
  return (
    <Link
      className='before:ease relative flex items-center justify-center overflow-hidden border border-secondary bg-secondary px-5 py-2 text-center text-neutral-50 shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-secondary hover:before:-translate-x-40 '
      href={href}
      style={style}
    >
      <span className='font-semibold max-md:text-xl'>{children}</span>
    </Link>
  )
}
