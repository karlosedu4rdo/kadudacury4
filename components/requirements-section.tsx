import { Check } from "lucide-react"

const requirements = [
  {
    title: "Não ter restrição no nome",
    description: "Realize uma consulta prévia para saber se você está apto a participar do programa",
  },
  {
    title: "Entrada a partir de R$800,00",
    description: "Valor acessível para dar início ao seu financiamento e conquistar seu imóvel",
  },
  {
    title: "Renda familiar a partir de R$3.850,00",
    description: "Se você possui renda familiar a partir deste valor, já pode participar do programa",
  },
]

export function RequirementsSection() {
  return (
    <section className="py-12 md:py-16 bg-white opacity-0 animate-fade-in-up animation-delay-700">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-12 text-balance px-4">
          PARA COMPRAR VOCÊ PRECISA:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {requirements.map((req, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center px-4 opacity-0 animate-fade-in-up animation-delay-${(index + 8) * 200}`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-600 flex items-center justify-center mb-4 md:mb-6 hover:scale-110 transition-transform duration-300">
                <Check className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={3} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{req.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{req.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
