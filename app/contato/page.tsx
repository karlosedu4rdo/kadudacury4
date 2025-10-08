import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ContactSection } from "@/components/contact-section"
import { Phone, Mail, MapPin } from "lucide-react"

export default function ContatoPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Entre em Contato</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Estamos prontos para ajudar você a realizar o sonho da casa própria
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Telefone</h3>
              <p className="text-gray-600">(11) 92177-3843</p>
              <p className="text-gray-600">(11) 5061-0022</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">E-mail</h3>
              <p className="text-gray-600">contato@kakodacury.com.br</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">Endereço</h3>
              <p className="text-gray-600">São Paulo - SP</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactSection />

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
