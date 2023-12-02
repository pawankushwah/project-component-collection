import Image from 'next/image'
import React from 'react'

type propsType = {
      text: string,
      size: number
}

export default function TextWithImage({text, size}: propsType) {
  return (
      <span className="text-[var(--primary)] relative">
      <span> {text} </span>
      <Image
        src="/teachline-images/headline-curve.svg"
        alt=""
        width={15 * size}
        height={3 * size}
        className="absolute w-full h-full -left-[8%] top-[65%] rotate-3"
      />
    </span>
  )
}
