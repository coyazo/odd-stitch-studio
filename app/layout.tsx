import { Analytics } from "@vercel/analytics/react";
import './globals.css'
import { IBM_Plex_Mono } from 'next/font/google'

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata = {
  title: 'OSS',
  description: 'Odd Stitch Studio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ibmPlexMono.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}