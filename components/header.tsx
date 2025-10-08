"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Phone, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" className="text-blue-600 md:w-8 md:h-8">
                <path d="M16 4L4 12V28H12V20H20V28H28V12L16 4Z" fill="currentColor" />
              </svg>
              <div className="ml-2">
                <div className="text-blue-600 font-bold text-lg md:text-xl leading-none mb-0.5">kakodacury</div>
                <div className="text-[9px] md:text-[10px] text-gray-600 leading-tight">CONSTRUTORA E INCORPORADORA</div>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium absolute left-1/2 transform -translate-x-1/2">
            <Link href="/imoveis" className="hover:text-blue-600 transition-colors duration-150" prefetch={false}>
              Imóveis
            </Link>
            <Link href="/sobre-nos" className="hover:text-blue-600 transition-colors duration-150" prefetch={false}>
              Sobre Nós
            </Link>
            <Link href="/indicacao" className="hover:text-blue-600 transition-colors duration-150" prefetch={false}>
              Indicação
            </Link>
            <Link href="/contato" className="hover:text-blue-600 transition-colors duration-150" prefetch={false}>
              Contato
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              <span className="font-medium">(11) 92177-3843</span>
            </div>
            <Button 
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-150"
            >
              <Link href="https://wa.me/5511921773843" target="_blank" rel="noopener noreferrer">
                Fazer Simulação
              </Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-200 animate-fade-in mobile-menu">
            <div className="flex flex-col space-y-3">
              <Link
                href="/imoveis"
                className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                onClick={closeMobileMenu}
                prefetch={false}
              >
                Imóveis
              </Link>
              <Link
                href="/sobre-nos"
                className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                onClick={closeMobileMenu}
                prefetch={false}
              >
                Sobre Nós
              </Link>
              <Link
                href="/indicacao"
                className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                onClick={closeMobileMenu}
                prefetch={false}
              >
                Indicação
              </Link>
              <Link
                href="/contato"
                className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                onClick={closeMobileMenu}
                prefetch={false}
              >
                Contato
              </Link>
              <div className="px-4 pt-2">
                <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href="https://wa.me/5511921773843" target="_blank" rel="noopener noreferrer">
                    Fazer Simulação
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
