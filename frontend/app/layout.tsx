import type React from "react"
import "./globals.css"
import { Providers } from "@/components/providers"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Providers>
       {children}
       </Providers>
      </body>
    </html>
  )
}
