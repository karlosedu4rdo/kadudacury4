"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin } from "lucide-react"
import { PropertyModal } from "@/components/property-modal"
import { useProperties } from "@/hooks/use-properties"

const apartments = [
  {
    id: 1,
    name: "9 de Julho",
    location: "Saúdes, Parelheiros e Cobertura Duplex",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "/modern-apartment-building-itaquera.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 266.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "34m² a 38m²",
    description:
      "Apartamento moderno e confortável, ideal para famílias que buscam qualidade de vida. Localizado em região com fácil acesso a transporte público, escolas, mercados e áreas de lazer.",
    features: [
      "Área de lazer completa",
      "Quadra poliesportiva",
      "Elevador",
      "Playground infantil",
      "Portaria 24h",
      "Área verde",
      "Salão de festas",
      "Estacionamento coberto",
    ],
  },
  {
    id: 2,
    name: "Morumbi",
    location: "Studios, 1, 2 Dorms., Coberturas Duplex e Houses",
    status: "Pronto Para Morar",
    statusColor: "bg-green-600",
    image: "/tall-apartment-building-vila-re.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 285.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "38m² a 42m²",
    description:
      "Empreendimento completo com diversas opções de plantas, perfeito para quem busca conforto e praticidade em uma das melhores regiões de São Paulo.",
    features: [
      "Área de lazer completa",
      "Piscina",
      "Academia",
      "Playground infantil",
      "Portaria 24h",
      "Salão de festas",
      "Churrasqueira",
      "Estacionamento",
    ],
  },
  {
    id: 3,
    name: "Pirituba II",
    location: "Studios, 1 Dorm., 2 Dorms. e Cobertura Duplex",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "/modern-residential-building-vila-sonia.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 245.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "32m² a 36m²",
    description:
      "Localização privilegiada com fácil acesso ao transporte público e comércio local. Ideal para quem busca praticidade no dia a dia.",
    features: ["Área de lazer", "Playground", "Portaria 24h", "Elevador", "Salão de festas", "Área verde"],
  },
  {
    id: 4,
    name: "Jardim Botânico",
    location: "Studios, 2 Dorms., 1 Dorm., e Office e Cobertura Duplex",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "/apartment-tower-sacoma.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 298.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "36m² a 40m²",
    description:
      "Empreendimento moderno próximo ao Jardim Botânico, oferecendo qualidade de vida e contato com a natureza.",
    features: [
      "Área de lazer completa",
      "Quadra poliesportiva",
      "Piscina",
      "Academia",
      "Portaria 24h",
      "Playground",
      "Salão de festas",
      "Pet place",
    ],
  },
  {
    id: 5,
    name: "Jaraguá",
    location: "Studio, 2 Dorms., 1 Dorm. e Office, Jardim e Cobertura Duplex",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "/residential-building-morumbi.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 255.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "34m² a 38m²",
    description:
      "Apartamentos com excelente custo-benefício na região do Jaraguá, com infraestrutura completa e fácil acesso.",
    features: [
      "Área de lazer",
      "Playground infantil",
      "Portaria 24h",
      "Elevador",
      "Salão de festas",
      "Churrasqueira",
      "Estacionamento",
    ],
  },
]

export function ApartmentsSection() {
  const { properties, loading } = useProperties()
  const [selectedProperty, setSelectedProperty] = useState<(typeof properties)[0] | null>(null)
  const [displayApartments, setDisplayApartments] = useState(apartments)

  useEffect(() => {
    if (!loading && properties.length > 0) {
      // Pega os imóveis marcados como destaque (máximo 5)
      const featured = properties.filter(p => p.featured)
      if (featured.length > 0) {
        setDisplayApartments(featured)
      } else {
        // Se não houver imóveis em destaque, pega os primeiros 5
        setDisplayApartments(properties.slice(0, 5))
      }
    }
  }, [properties, loading])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-16 bg-gray-50 opacity-0 animate-fade-in-up animation-delay-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Apartamentos em todas as
              <br />
              regiões da Cidade de São Paulo
            </h2>
            <Link href="/imoveis">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent transition-all duration-300 hover:scale-105"
              >
                Ver Todos
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {displayApartments.map((apt, index) => (
              <div
                key={apt.id}
                className={`group cursor-pointer transition-transform duration-300 hover:scale-105`}
                onClick={() => setSelectedProperty(apt)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg h-80">
                  <Image
                    src={apt.image || "/placeholder.svg"}
                    alt={apt.name}
                    fill
                    priority={index < 3}
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    loading={index < 3 ? "eager" : "lazy"}
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <Badge className="bg-blue-600 text-white text-xs">{apt.badge}</Badge>
                    <Badge className={`${apt.statusColor} text-white text-xs block w-fit`}>{apt.status}</Badge>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/95 via-blue-800/70 to-transparent p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{apt.name}</h3>
                    <p className="text-sm text-gray-200 flex items-start gap-1">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{apt.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProperty && <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
    </>
  )
}
