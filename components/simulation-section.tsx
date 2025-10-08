"use client"

import { Button } from "@/components/ui/button"
import { Calculator } from "lucide-react"

export function SimulationSection() {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100/30 to-transparent rounded-full -translate-y-48 translate-x-48 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-yellow-100/30 to-transparent rounded-full translate-y-40 -translate-x-40 animate-float animation-delay-300"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 bg-green-100 text-black px-6 py-3 rounded-full mb-8 animate-fade-in-up animation-delay-100">
            <Calculator className="w-5 h-5" />
            <span className="font-medium">Simulação Gratuita e Sem Compromisso</span>
          </div>

          {/* Main title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up animation-delay-200">
            Descubra Como é Fácil
            <br />
            Ter Seu Imóvel Próprio!
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
            Simule em poucos minutos e veja as condições ideais para você.
          </p>

          {/* CTA Button */}
          <Button 
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl btn-hover-lift btn-hover-scale animate-fade-in-up animation-delay-400 relative overflow-hidden gpu-accelerated"
          >
            <span className="relative z-10">Iniciar Simulação Gratuita</span>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent rounded-xl animate-gradient"></div>
          </Button>
        </div>
      </div>
    </section>
  )
}
