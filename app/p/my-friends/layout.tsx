import "@/app/(main)/globals.css";
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';

const font = Ubuntu({ subsets: ["latin-ext", "latin"], weight: "400" });

export const metadata = {
  title: "My Friends",
  description:
    "This web page shows the profile of my friends",
};

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