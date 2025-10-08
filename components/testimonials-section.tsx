import Image from "next/image"

const testimonials = [
  {
    id: 1,
    image: "/happy-man-in-new-apartment-keys.jpg",
    title: "Nunca Pare de Sonhar",
  },
  {
    id: 2,
    image: "/happy-family-new-home-celebration.jpg",
    title: "Nunca Pare de Sonhar",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-white opacity-0 animate-fade-in-up animation-delay-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">Nunca Pare de Sonhar</h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Descubra histórias inspiradoras de conquistas! Confire alguns depoimentos reais de quem transformou o sonho
            do apartamento próprio em realidade. Sua história pode ser a próxima!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative overflow-hidden rounded-lg shadow-xl group cursor-pointer transition-transform duration-300 hover:scale-105 h-80"
            >
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/95 via-blue-700/60 to-transparent flex items-end justify-center p-8">
                <div className="text-center text-white">
                  <p className="text-sm uppercase tracking-wider mb-2">Nunca Pare de</p>
                  <h3 className="text-4xl font-bold italic">Sonhar</h3>
                  <div className="mt-4">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor" className="mx-auto">
                      <path d="M20 2L2 12V28H12V20H28V28H38V12L20 2Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
