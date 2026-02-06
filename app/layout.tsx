import '../styles/globals.css'
import Providers from './providers-wrapper'

export const metadata = {
  title: 'Frontend Example Next',
  description: 'Next.js App Router Example',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
