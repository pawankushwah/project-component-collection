import './page.css';

export const metadata = {
  title: 'Draggable Div component',
  description: 'we can move this div anywhere we want',
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
