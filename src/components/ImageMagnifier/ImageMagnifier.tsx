'use client'

import Image from 'next/image'
import { useState } from 'react'

type ImageMagnifier = {
  imageUrl: string
  altImage: string
}

export const ImageMagnifier = ({ imageUrl, altImage }: ImageMagnifier) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const handleMouseHover = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - top) / height) * 100
    setPosition({ x, y })

    setCursorPosition({ x: e.pageX - left, y: e.pageY - top })
  }

  return (
    <div
      className='relative flex w-full max-w-[500px]  justify-center'
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseHover}
    >
      <Image
        alt={altImage}
        style={{ width: 'auto', cursor: 'zoom-in' }}
        height={1300}
        width={1000}
        src={imageUrl}
      />
      {showMagnifier && (
        <div
          style={{
            position: 'absolute',
            cursor: 'zoom-in',
            left: `${cursorPosition.x - 75}px`,
            top: `${cursorPosition.y - 75}px`,
            pointerEvents: 'none',
          }}
        >
          <div
            className='h-[150px] w-[150px] scale-150 cursor-zoom-in rounded-full border-2 border-solid border-secondary'
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundPosition: `${position.x}% ${position.y}% `,
            }}
          ></div>
        </div>
      )}
    </div>
  )
}
