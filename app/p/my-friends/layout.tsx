import "@/app/(main)/globals.css";
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';
import Head from "next/head";

const font = Ubuntu({ subsets: ["latin-ext", "latin"], weight: "400" });

export const metadata = {
  title: "My Friends",
  description:
    "This web page shows the profile of my friends"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <Head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </Head>
      <body className={font.className}>{children}</body>
    </html>
  )
}