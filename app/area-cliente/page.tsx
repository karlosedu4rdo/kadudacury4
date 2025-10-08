import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, User } from "lucide-react"

export default function AreaClientePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Área do Cliente</h1>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CPF ou E-mail</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input type="text" placeholder="Digite seu CPF ou e-mail" className="pl-10" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input type="password" placeholder="Digite sua senha" className="pl-10" />
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6">Entrar</Button>

              <div className="text-center">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Esqueci minha senha
                </a>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Ainda não tem cadastro?</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Criar conta
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
