"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { whatsappMessages } from "@/lib/whatsapp"

export function ReferralSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redireciona para WhatsApp com dados do formulário
    window.open(whatsappMessages.referralProgram(formData), "_blank")
  }

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gray-50 opacity-0 animate-fade-in-up animation-delay-600">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center max-w-6xl mx-auto">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-balance">
              Junte-se ao nosso Programa <span className="text-green-600">"Indique e Ganhe"</span> agora mesmo
            </h2>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
              Cadastre-se hoje e comece a indicar! Quanto mais pessoas você indicar, mais você ganha. É uma oportunidade
              única de ajudar amigos e familiares a realizarem o sonho da casa própria e ainda ser recompensado por
              isso.
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 md:px-8 transition-all duration-300 hover:scale-105">
              <Link href={whatsappMessages.referralPage()} target="_blank" rel="noopener noreferrer">
                Simular agora
              </Link>
            </Button>
          </div>

          {/* Right Form */}
          <div className="bg-green-600 rounded-2xl p-6 md:p-8 text-white">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Cadastre-se agora</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Nome completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white text-gray-900 placeholder:text-gray-500"
                required
              />
              <Input
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white text-gray-900 placeholder:text-gray-500"
                required
              />
              <Input
                type="tel"
                placeholder="Telefone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white text-gray-900 placeholder:text-gray-500"
                required
              />
              <Button
                type="submit"
                className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold py-5 md:py-6 text-base md:text-lg transition-all duration-300 hover:scale-105"
              >
                REALIZAR CADASTRO
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
