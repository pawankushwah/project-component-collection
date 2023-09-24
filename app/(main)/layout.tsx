import './globals.css'
import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'

const font = Ubuntu({ subsets: ["latin-ext", "latin"], weight: "400" })

export const metadata: Metadata = {
  title: 'Web Project Collection By Pawan',
  description: 'This page contains the collection of projects related to the web developement. Projects are created mainly with the help of NextJS, TailwindCSS and Mongoose',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={font.className}>{children}</body>
    </html>
  )
}
