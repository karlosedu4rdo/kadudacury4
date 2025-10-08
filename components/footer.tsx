import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Logo and Description */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-blue-600">
                <path d="M16 4L4 12V28H12V20H20V28H28V12L16 4Z" fill="currentColor" />
              </svg>
              <div className="ml-2">
                <div className="text-blue-600 font-bold text-xl leading-none mb-1">kakodacury</div>
                <div className="text-[10px] text-gray-600 leading-tight">CONSTRUTORA E INCORPORADORA</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 italic mb-4">você esperto</p>
            <div className="flex gap-2">
              <img src="/reclame-aqui-badge.jpg" alt="Reclame Aqui" className="h-10" />
              <img src="/proteste-badge.jpg" alt="Proteste" className="h-10" />
            </div>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-bold mb-3 md:mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contato" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Entre em Contato
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Carreiras
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Seja Nosso Parceiro
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Seja um Fornecedor
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-bold mb-3 md:mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Suporte Via Chat
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Relacionamento com Investidores
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Central de Atendimento
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Siga-nos & CAC */}
          <div>
            <h3 className="font-bold mb-3 md:mb-4">Siga-nos</h3>
            <div className="flex gap-3 mb-6">
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-blue-600 text-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
                </svg>
                <div>
                  <p className="text-xs">CAC</p>
                  <p className="text-xs">Central de Atendimento ao Cliente</p>
                </div>
              </div>
              <p className="text-lg md:text-xl font-bold">(11) 5061-0022</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-600">
          <p className="leading-relaxed">
            Copyright © 2025 Construtora Kakodacury - Todos os Direitos Reservados | Política de Privacidade | Condomínio
            Edifício Itália - Av. Ipiranga 344 - 4º Andar
          </p>
        </div>
      </div>
    </footer>
  )
}
