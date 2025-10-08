import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Building2, Users, Home, Star } from "lucide-react"

export default function SobreNosPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] bg-gray-900">
        <img
          src="/placeholder.svg?height=400&width=1600"
          alt="Kakodacury"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Sobre Nós</h1>
        </div>
      </section>

      {/* Quality Policy Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
                    Política de qualidade
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Na Kakodacury, <span className="text-gray-900">acreditamos que morar bem deve ser uma</span>{" "}
                  <span className="text-blue-600">realidade possível</span>{" "}
                  <span className="text-gray-900">para todos</span>
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Por isso, desenvolvemos e construímos empreendimentos com <strong>facilidade de pagamento</strong>,
                  bem localizados e com <strong>padrão de qualidade</strong> que assegura conforto, segurança e
                  valorização ao longo do tempo.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                  <p className="text-gray-800 leading-relaxed">
                    <strong>Mais do que imóveis, entregamos conquistas de vida.</strong> Atuamos com compromisso,
                    responsabilidade, sustentabilidade e atenção aos detalhes e normativas. Buscamos a melhoria contínua
                    para assegurar a satisfação dos nossos clientes durante todo o processo de compra.
                  </p>
                  <p className="text-sm text-gray-600 mt-4">POL-001-R01 | 19/08/2025</p>
                </div>
              </div>

              <div className="relative">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Profissional Kakodacury"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 md:order-1">
                <img src="/placeholder.svg?height=500&width=600" alt="São Paulo" className="rounded-lg shadow-xl" />
              </div>

              <div className="space-y-6 order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  A HISTÓRIA DA <span className="text-blue-600">KAKODACURY</span>
                </h2>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white p-3 rounded-lg">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Fundada em 2017</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Fruto da visão e experiência de seus fundadores, que trazem uma longa trajetória no mercado da
                      construção civil, com o compromisso de transformar sonhos e objetivos em realidade, concretizando
                      o desejo das famílias em conquistar a casa própria e realizar investimentos promissores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Hoje já somamos...</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">+ DE 80</div>
              <div className="text-sm text-gray-600 uppercase">
                Empreendimentos
                <br />
                na capital paulista
              </div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">+ DE 60</div>
              <div className="text-sm text-gray-600 uppercase">
                Empreendimentos
                <br />
                em obras
              </div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Home className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">+ DE 2.000</div>
              <div className="text-sm text-gray-600 uppercase">Unidades entregues</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">+ DE 11.000</div>
              <div className="text-sm text-gray-600 uppercase">Sonhos realizados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivered Projects Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">PRIMEIROS EMPREENDIMENTOS ENTREGUES:</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Empreendimento entregue 1"
              className="rounded-lg w-full h-64 object-cover"
            />
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Empreendimento entregue 2"
              className="rounded-lg w-full h-64 object-cover"
            />
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Empreendimento entregue 3"
              className="rounded-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
