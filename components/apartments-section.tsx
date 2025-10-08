"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, X, Bed, Bath, Maximize } from "lucide-react"
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
  const [selectedProperty, setSelectedProperty] = useState<typeof apartments[0] | null>(null)
  const [displayApartments, setDisplayApartments] = useState(apartments)

  useEffect(() => {
    if (!loading && properties.length > 0) {
      // Pega os imóveis marcados como destaque (máximo 5)
      const featured = properties.filter(p => p.featured)
      if (featured.length > 0) {
        // Map properties to apartment format
        const mappedFeatured = featured.map(prop => ({
          id: prop.id,
          name: prop.name,
          location: prop.location,
          status: prop.status || 'Disponível',
          statusColor: prop.status === 'Em Construção' ? 'bg-orange-600' : 'bg-green-600',
          image: prop.image || '/placeholder.svg',
          badge: 'Minha Casa Minha Vida',
          price: prop.price || 'R$ 0',
          bedrooms: prop.bedrooms || 2,
          bathrooms: prop.bathrooms || 1,
          area: prop.area || '34m²',
          description: prop.description || 'Apartamento moderno e confortável.',
          features: prop.features || []
        }))
        setDisplayApartments(mappedFeatured)
      } else {
        // Se não houver imóveis em destaque, pega os primeiros 5
        const mappedProperties = properties.slice(0, 5).map(prop => ({
          id: prop.id,
          name: prop.name,
          location: prop.location,
          status: prop.status || 'Disponível',
          statusColor: prop.status === 'Em Construção' ? 'bg-orange-600' : 'bg-green-600',
          image: prop.image || '/placeholder.svg',
          badge: 'Minha Casa Minha Vida',
          price: prop.price || 'R$ 0',
          bedrooms: prop.bedrooms || 2,
          bathrooms: prop.bathrooms || 1,
          area: prop.area || '34m²',
          description: prop.description || 'Apartamento moderno e confortável.',
          features: prop.features || []
        }))
        setDisplayApartments(mappedProperties)
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
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent btn-hover-lift btn-hover-scale gpu-accelerated transition-all duration-300"
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
                className={`group cursor-pointer card-hover gpu-accelerated animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
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

      {selectedProperty && <ApartmentModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
    </>
  )
}

// Simple modal component for apartments
function ApartmentModal({ property, onClose }: { property: typeof apartments[0], onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Property Image */}
        <div className="relative h-64">
          <Image 
            src={property.image || "/placeholder.svg"} 
            alt={property.name} 
            fill
            className="object-cover rounded-t-lg"
          />
        </div>

        {/* Property Details */}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{property.name}</h3>
          <p className="text-gray-600 mb-4">{property.location}</p>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{property.bedrooms} quartos</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{property.bathrooms} banheiros</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{property.area}</span>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{property.description}</p>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Características:</h4>
            <ul className="grid grid-cols-2 gap-1 text-sm text-gray-600">
              {property.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{property.price}</p>
              <p className="text-sm text-gray-500">{property.status}</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
