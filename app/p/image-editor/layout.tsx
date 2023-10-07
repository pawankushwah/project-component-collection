import './page.css';

export const metadata = {
  title: 'Image Editor',
  description: 'you can manage brightness, saturation, inversion, grayscale and much more.',
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
