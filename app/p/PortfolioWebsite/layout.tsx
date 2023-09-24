import './page.css';

export const metadata = {
  title: 'Portfolio Website',
  description: 'This projects shows the information about me and shows my skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
