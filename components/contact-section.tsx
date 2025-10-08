"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redireciona para WhatsApp
    window.open("https://wa.me/5511921773843?text=Olá! Gostaria de entrar em contato.", "_blank")
  }

  return (
    <section className="py-12 md:py-16 bg-blue-600 text-white opacity-0 animate-fade-in-up animation-delay-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-balance leading-tight">
              Aqui, você realiza o sonho do seu apartamento próprio com as melhores condições.
            </h2>
            <p className="text-gray-200 leading-relaxed text-sm md:text-base">
              Não perca a chance, venha participar do nosso Feirão de Imóveis e aproveite ofertas imperdíveis somente
              este final de semana!
            </p>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Nosso Contato</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  Digite seu Nome
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white border-white/30 text-gray-900 placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm mb-2">
                  Número de Contato
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white border-white/30 text-gray-900 placeholder:text-gray-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2">
                  E-mail
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white border-white/30 text-gray-900 placeholder:text-gray-500"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all duration-300 hover:scale-105"
              >
                Enviar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
