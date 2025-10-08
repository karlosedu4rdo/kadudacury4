import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import "../styles/performance.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: "Kakodacury - Construtora e Incorporadora | Apartamentos em São Paulo",
  description:
    "Realize o sonho do apartamento próprio com a Kakodacury. Apartamentos em todas as regiões de São Paulo com as melhores condições de financiamento.",
  generator: "v0.app",
  keywords: ["apartamentos", "São Paulo", "financiamento", "imóveis", "kakodacury"],
  authors: [{ name: "Kakodacury" }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: "Kakodacury - Apartamentos em São Paulo",
    description: "Realize o sonho do apartamento próprio com as melhores condições.",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
