import "@/app/(main)/globals.css";
import { Ubuntu } from 'next/font/google';

const font = Ubuntu({ subsets: ["latin-ext", "latin"], weight: "400" });

export const metadata = {
  title: "TO DO APP",
  description: "You can create a your task, delete it and you can take put each task in different categories",
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