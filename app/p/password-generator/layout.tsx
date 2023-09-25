import "./page.css";
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';

const font = Ubuntu({ subsets: ["latin-ext", "latin"], weight: "400" });

export const metadata = {
  title: "Portfolio Website",
  description:
    "This projects shows the information about me and shows my skills",
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