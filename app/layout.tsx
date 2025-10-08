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
  title: {
    default: "Kakodacury - Corretor de Imóveis | Apartamentos em São Paulo",
    template: "%s | Kakodacury - Corretor de Imóveis"
  },
  description:
    "Realize o sonho do apartamento próprio com a Kakodacury. Apartamentos em todas as regiões de São Paulo com as melhores condições de financiamento. Simulação gratuita e sem compromisso.",
  generator: "Next.js",
  keywords: [
    "apartamentos São Paulo",
    "imóveis São Paulo", 
    "financiamento imóveis",
    "kakodacury",
    "corretor de imóveis",
    "apartamento próprio",
    "Minha Casa Minha Vida",
    "imóveis na planta",
    "apartamentos novos",
    "financiamento habitacional"
  ],
  authors: [{ name: "Kakodacury", url: "https://kakodacury.com" }],
  creator: "Kakodacury",
  publisher: "Kakodacury",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://kakodacury.com"),
  alternates: {
    canonical: "/",
    languages: {
      'pt-BR': '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: "Kakodacury - Corretor de Imóveis | Apartamentos em São Paulo",
    description: "Realize o sonho do apartamento próprio com a Kakodacury. Apartamentos em todas as regiões de São Paulo com as melhores condições de financiamento.",
    url: "https://kakodacury.com",
    siteName: "Kakodacury",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kakodacury - Apartamentos em São Paulo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kakodacury - Corretor de Imóveis | Apartamentos em São Paulo",
    description: "Realize o sonho do apartamento próprio com a Kakodacury. Apartamentos em todas as regiões de São Paulo com as melhores condições de financiamento.",
    images: ["/og-image.jpg"],
  },
  category: "real estate",
  classification: "business",
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
