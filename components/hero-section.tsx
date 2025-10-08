import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <div className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-full font-bold text-lg">Mega</div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">FEIRÃO</h1>

            <div className="text-2xl md:text-3xl font-semibold">de Apartamentos</div>

            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7V17H8V11H16V17H22V7L12 2Z" />
              </svg>
              <span className="font-bold">kakodacury</span>
            </div>

            <div className="space-y-2">
              <p className="text-lg">Uma oportunidade</p>
              <p className="text-xl font-semibold">única para você!</p>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-bold transition-all duration-300 hover:scale-105"
            >
              <Link href="https://wa.me/5511921773843" target="_blank" rel="noopener noreferrer">
                QUERO APROVEITAR AS OFERTAS
              </Link>
            </Button>
          </div>

          {/* Right Content - Building Image */}
          <div className="relative w-full max-w-md mx-auto">
            <Image
              src="/modern-apartment-night.png"
              alt="Edifício moderno"
              width={400}
              height={300}
              priority
              className="w-full rounded-lg shadow-2xl"
              quality={85}
            />

            {/* Promotional Card */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white text-blue-600 p-6 rounded-lg shadow-xl max-w-xs">
              <Badge className="bg-blue-600 text-white mb-2">IMÓVEIS ATÉ 96,7%</Badge>
              <h3 className="text-2xl font-bold mb-2">
                Seu novo
                <br />
                apartamento
              </h3>
              <p className="text-gray-700 mb-4">
                no feirão mais
                <br />
                aguardado do ano
              </p>

              <div className="bg-blue-600 text-white p-4 rounded-lg">
                <p className="text-sm mb-1">Descontos de até</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm">R$</span>
                  <span className="text-5xl font-bold">71</span>
                  <span className="text-2xl">MIL</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Image src="/caixa-logo.png" alt="Caixa" width={24} height={24} className="h-6 w-auto" />
                <div className="text-xs text-gray-600">
                  <p className="font-semibold">Financiamento facilitado</p>
                  <p>Use seu FGTS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
