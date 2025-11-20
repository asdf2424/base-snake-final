import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Base Snake Final',
  description: 'A Next.js application with TypeScript and Tailwind CSS',
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

