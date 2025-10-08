import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ReferralSection } from "@/components/referral-section"
import { Gift, Users, DollarSign, CheckCircle } from "lucide-react"

export default function IndicacaoPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Programa <span className="text-yellow-300">"Indique e Ganhe"</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Ajude amigos e familiares a realizarem o sonho da casa própria e seja recompensado por isso!
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Como funciona?</h2>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">1. Cadastre-se</h3>
              <p className="text-gray-600">Faça seu cadastro no programa de indicação gratuitamente</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <Gift className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">2. Indique</h3>
              <p className="text-gray-600">Compartilhe com amigos e familiares que querem comprar um imóvel</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">3. Acompanhe</h3>
              <p className="text-gray-600">Acompanhe o processo de compra do seu indicado</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">4. Ganhe</h3>
              <p className="text-gray-600">Receba sua recompensa quando a venda for concretizada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Vantagens do Programa</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-3 text-green-600">Sem Limite de Indicações</h3>
              <p className="text-gray-700">
                Quanto mais você indicar, mais você ganha. Não há limite para o número de indicações.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-3 text-green-600">Processo Simples</h3>
              <p className="text-gray-700">
                Cadastro rápido e fácil. Basta preencher o formulário e começar a indicar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-3 text-green-600">Recompensas Atrativas</h3>
              <p className="text-gray-700">Receba recompensas em dinheiro por cada indicação que resultar em venda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ReferralSection />

      <Footer />
      <WhatsAppButton context="referral" />
    </main>
  )
}
