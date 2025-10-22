import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Portfolio | Web Developer",
  description: "Yuta Hamasaki portfolio showcasing Web development expertise",
  keywords: ["web", "engineer","Yuta Hamasaki", "portfolio", "web development"],
  authors: [{ name: "Yuta Hamasaki" }],
  openGraph: {
    title: "Portfolio | Web Developer",
    description: "Yuta Hamasaki portfolio showcasing Web development expertise",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <LanguageProvider>
          <Suspense fallback={null}>{children}</Suspense>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
