"use client"

import { useState, useEffect } from "react"
import { Storage } from "@/lib/storage"

export interface Property {
  id: number
  name: string
  location: string
  region: string
  details: string
  status: string
  statusColor: string
  image: string
  badge: string
  price: string
  bedrooms: number
  bathrooms: number
  area: string
  zone: string
  featured?: boolean
  description?: string
  features?: string[]
  images?: string[] // Array de URLs ou base64 das imagens
  coverImageIndex?: number // Índice da imagem de capa
}

const initialProperties: Property[] = [
  {
    id: 1,
    name: "Viva Itaquera",
    location: "Itaquera",
    region: "leste",
    details: "Studios, 1 Dorm., + Office",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "/modern-apartment-building-itaquera.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 245.000",
    bedrooms: 1,
    bathrooms: 1,
    area: "28m² a 32m²",
    zone: "Leste",
    featured: true,
    description: "Apartamento moderno e confortável em Itaquera, ideal para quem busca qualidade de vida com fácil acesso ao transporte público e comércio local.",
    features: ["Área de lazer completa", "Playground infantil", "Portaria 24h", "Elevador", "Salão de festas", "Área verde"]
  },
  {
    id: 2,
    name: "Vila Ré",
    location: "Vila Ré",
    region: "leste",
    details: "Studios, 1 e 2 Dorms., Cobertura Duplex e House",
    status: "Pronto Para Morar",
    statusColor: "bg-green-600",
    image: "/tall-apartment-building-vila-re.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 285.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "38m² a 42m²",
    zone: "Leste",
    featured: true,
    description: "Empreendimento completo na Vila Ré com diversas opções de plantas, perfeito para famílias que buscam conforto e praticidade.",
    features: ["Área de lazer completa", "Piscina", "Academia", "Playground infantil", "Portaria 24h", "Salão de festas", "Churrasqueira", "Estacionamento"]
  },
  {
    id: 3,
    name: "Vila Sônia II",
    location: "Vila Sônia",
    region: "oeste",
    details: "Studios, 1 Dorm., + Office, 2 Dorms. e Cobertura Duplex",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "/modern-residential-building-vila-sonia.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 268.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "34m² a 38m²",
    zone: "Oeste",
    featured: true,
    description: "Localização privilegiada na Vila Sônia com fácil acesso ao transporte público e comércio. Ideal para quem busca praticidade no dia a dia.",
    features: ["Área de lazer", "Playground", "Portaria 24h", "Elevador", "Salão de festas", "Área verde"]
  },
  {
    id: 4,
    name: "Sacomã II",
    location: "Sacomã",
    region: "sul",
    details: "Studios, 2 Dorms., 1 Dorm., + Office e Cobertura Duplex",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "/apartment-tower-sacoma.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 275.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "36m² a 40m²",
    zone: "Sul",
    featured: true,
    description: "Empreendimento moderno no Sacomã, oferecendo qualidade de vida e infraestrutura completa para toda a família.",
    features: ["Área de lazer completa", "Quadra poliesportiva", "Piscina", "Academia", "Portaria 24h", "Playground", "Salão de festas", "Pet place"]
  },
  {
    id: 5,
    name: "Giovanni Gronchi",
    location: "Morumbi",
    region: "sul",
    details: "Studios, 1 e 2 Dorms., + Office, 1 Dorm. e Cobertura Duplex",
    status: "Pronto Para Morar",
    statusColor: "bg-green-600",
    image: "/residential-building-morumbi.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 295.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "38m² a 42m²",
    zone: "Sul",
    featured: true,
    description: "Apartamentos prontos para morar no Morumbi, uma das regiões mais valorizadas de São Paulo, com infraestrutura completa.",
    features: ["Área de lazer completa", "Piscina", "Academia", "Quadra poliesportiva", "Portaria 24h", "Playground", "Salão de festas", "Estacionamento"]
  },
  {
    id: 6,
    name: "Estação Itaberaba",
    location: "Itaberaba",
    region: "norte",
    details: "Studios e 1 Dorm., + Office",
    status: "Lançamento",
    statusColor: "bg-blue-600",
    image: "/new-apartment-building-itaberaba.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 235.000",
    bedrooms: 1,
    bathrooms: 1,
    area: "28m² a 32m²",
    zone: "Norte",
    featured: false,
    description: "Lançamento próximo à estação Itaberaba, ideal para quem busca mobilidade e praticidade no dia a dia.",
    features: ["Área de lazer", "Playground", "Portaria 24h", "Elevador", "Salão de festas"]
  },
  {
    id: 7,
    name: "Vila Clarice",
    location: "Vila Clarice",
    region: "leste",
    details: "Studios, 1 Dorm., + Office, 2 Dorms. Tradicional e Cobertura Duplex",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "/apartment-complex-vila-clarice.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 258.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "34m² a 38m²",
    zone: "Leste",
    featured: false,
    description: "Empreendimento na Vila Clarice com diversas opções de plantas, perfeito para diferentes perfis de famílias.",
    features: ["Área de lazer", "Quadra poliesportiva", "Playground", "Portaria 24h", "Elevador", "Salão de festas", "Churrasqueira"]
  },
  {
    id: 8,
    name: "Tucuruvi",
    location: "Tucuruvi",
    region: "norte",
    details: "Studios, 1 Dorm., + Office, 2 Dorms., + Office e Cobertura Duplex",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "/modern-building-tucuruvi.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 265.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "34m² a 38m²",
    zone: "Norte",
    featured: false,
    description: "Apartamentos modernos no Tucuruvi com excelente infraestrutura e fácil acesso ao metrô e comércio local.",
    features: ["Área de lazer completa", "Piscina", "Academia", "Playground", "Portaria 24h", "Salão de festas", "Estacionamento"]
  },
  {
    id: 9,
    name: "São Joaquim",
    location: "Liberdade",
    region: "centro",
    details: "Studios, 1 dorm., + office, 2 dorms., 1 dorm. e Cobertura Duplex",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "/apartment-tower-sao-joaquim.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 288.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "36m² a 40m²",
    zone: "Centro",
    featured: false,
    description: "Localização privilegiada na Liberdade, próximo ao metrô e com fácil acesso a toda região central de São Paulo.",
    features: ["Área de lazer", "Academia", "Playground", "Portaria 24h", "Elevador", "Salão de festas", "Bike place"]
  },
  {
    id: 10,
    name: "Vista Cupecê",
    location: "Cupecê",
    region: "sul",
    details: "Studios, 1 dorm., + office e cobertura duplex",
    status: "Lançamento",
    statusColor: "bg-blue-600",
    image: "/residential-tower-cupece.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 252.000",
    bedrooms: 1,
    bathrooms: 1,
    area: "30m² a 34m²",
    zone: "Sul",
    featured: false,
    description: "Lançamento no Cupecê com vista privilegiada e infraestrutura completa para seu conforto e bem-estar.",
    features: ["Área de lazer", "Playground", "Portaria 24h", "Elevador", "Salão de festas", "Área verde"]
  },
  {
    id: 11,
    name: "Viva Penha",
    location: "Penha",
    region: "leste",
    details: "Studios, 1 Dorm., + Office, 2 Dorms. e Cobertura Duplex",
    status: "Lançamento",
    statusColor: "bg-blue-600",
    image: "/apartment-building-penha.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 248.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "32m² a 36m²",
    zone: "Leste",
    featured: false,
    description: "Novo empreendimento na Penha com excelente custo-benefício e fácil acesso ao transporte público.",
    features: ["Área de lazer", "Playground infantil", "Portaria 24h", "Elevador", "Salão de festas"]
  },
  {
    id: 12,
    name: "Campo Limpo",
    location: "Campo Limpo",
    region: "sul",
    details: "Studios, 1 e 2 Dorms., Penthouse e Cobertura Duplex",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "/modern-residential-campo-limpo.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 262.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "34m² a 38m²",
    zone: "Sul",
    featured: false,
    description: "Empreendimento completo no Campo Limpo com diversas opções de plantas e infraestrutura de lazer.",
    features: ["Área de lazer completa", "Quadra poliesportiva", "Piscina", "Playground", "Portaria 24h", "Salão de festas", "Churrasqueira"]
  },
  {
    id: 13,
    name: "Vila Prudente",
    location: "Vila Prudente",
    region: "leste",
    details: "Studios e Cobertura Duplex",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "/apartment-complex-vila-prudente.jpg",
    badge: "Minha Casa Minha Vida",
    price: "R$ 242.000",
    bedrooms: 1,
    bathrooms: 1,
    area: "28m² a 32m²",
    zone: "Leste",
    featured: false,
    description: "Apartamentos compactos e funcionais na Vila Prudente, perfeitos para quem busca praticidade e localização.",
    features: ["Área de lazer", "Playground", "Portaria 24h", "Elevador", "Salão de festas"]
  },
  {
    id: 14,
    name: "Berrini",
    location: "Berrini",
    region: "sul",
    details: "Studios e Cobertura Duplex",
    status: "Pronto Para Morar",
    statusColor: "bg-green-600",
    image: "/placeholder.svg?height=300&width=400",
    badge: "Minha Casa Minha Vida",
    price: "R$ 298.000",
    bedrooms: 1,
    bathrooms: 1,
    area: "30m² a 34m²",
    zone: "Sul",
    featured: false,
    description: "Apartamentos prontos na região do Berrini, uma das áreas mais valorizadas de São Paulo, próximo a grandes empresas.",
    features: ["Área de lazer", "Academia", "Portaria 24h", "Elevador", "Salão de festas", "Coworking", "Estacionamento"]
  },
  {
    id: 15,
    name: "Oratório",
    location: "Oratório",
    region: "leste",
    details: "Studios, 1 e 2 Dorms., 1 Dorm. + Office e Cobertura Duplex",
    status: "Lançamento",
    statusColor: "bg-blue-600",
    image: "/placeholder.svg?height=300&width=400",
    badge: "Minha Casa Minha Vida",
    price: "R$ 255.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "34m² a 38m²",
    zone: "Leste",
    featured: false,
    description: "Lançamento próximo à estação Oratório do metrô, ideal para quem busca mobilidade e qualidade de vida.",
    features: ["Área de lazer", "Playground", "Portaria 24h", "Elevador", "Salão de festas", "Bike place"]
  },
  {
    id: 16,
    name: "Vila das Belezas II",
    location: "Vila das Belezas",
    region: "sul",
    details: "Studios, 1 e 2 Dorms., 1 Dorm. + Office e Cobertura Duplex",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "/placeholder.svg?height=300&width=400",
    badge: "Minha Casa Minha Vida",
    price: "R$ 268.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "34m² a 38m²",
    zone: "Sul",
    featured: false,
    description: "Empreendimento na Vila das Belezas com infraestrutura completa e fácil acesso a comércio e serviços.",
    features: ["Área de lazer", "Quadra poliesportiva", "Playground", "Portaria 24h", "Elevador", "Salão de festas"]
  },
  {
    id: 17,
    name: "Morumbi II",
    location: "Morumbi",
    region: "sul",
    details: "Studios, 1 e 2 Dorms., 1 Dorm.",
    status: "Lançamento",
    statusColor: "bg-blue-600",
    image: "/placeholder.svg?height=300&width=400",
    badge: "Minha Casa Minha Vida",
    price: "R$ 292.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "36m² a 40m²",
    zone: "Sul",
    featured: false,
    description: "Novo lançamento no Morumbi, região nobre de São Paulo, com infraestrutura completa e fácil acesso.",
    features: ["Área de lazer completa", "Piscina", "Academia", "Playground", "Portaria 24h", "Salão de festas", "Pet place"]
  },
  {
    id: 18,
    name: "Jacanã II",
    location: "Jacanã",
    region: "norte",
    details: "Studios, 1 e 2 Dorms., 1 Dorm.",
    status: "Lançamento",
    statusColor: "bg-blue-600",
    image: "/placeholder.svg?height=300&width=400",
    badge: "Minha Casa Minha Vida",
    price: "R$ 258.000",
    bedrooms: 2,
    bathrooms: 1,
    area: "34m² a 38m²",
    zone: "Norte",
    featured: false,
    description: "Lançamento no Jacanã com excelente custo-benefício e infraestrutura completa para toda a família.",
    features: ["Área de lazer", "Playground infantil", "Portaria 24h", "Elevador", "Salão de festas", "Churrasqueira"]
  }
]

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProperties = async () => {
      const currentVersion = "2.1"
      
      try {
        const loaded = await Storage.get<Property[]>("properties", initialProperties, currentVersion)
        
        // Valida estrutura
        if (loaded.length > 0 && loaded[0].region !== undefined) {
          setProperties(loaded)
        } else {
          // Dados inválidos, usa iniciais
          setProperties(initialProperties)
          await Storage.set("properties", initialProperties, currentVersion)
        }
      } catch (error) {
        console.error("Error loading properties:", error)
        setProperties(initialProperties)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  const saveProperties = (newProperties: Property[]) => {
    setProperties(newProperties)
    Storage.set("properties", newProperties, "2.1").catch(console.error)
  }

  const addProperty = (property: Omit<Property, "id">) => {
    const newId = Math.max(...properties.map(p => p.id), 0) + 1
    const newProperty = { ...property, id: newId }
    saveProperties([...properties, newProperty])
  }

  const updateProperty = (id: number, property: Partial<Property>) => {
    const updated = properties.map(p =>
      p.id === id ? { ...p, ...property } : p
    )
    saveProperties(updated)
  }

  const deleteProperty = (id: number) => {
    saveProperties(properties.filter(p => p.id !== id))
  }

  const toggleFeatured = (id: number) => {
    const property = properties.find(p => p.id === id)
    if (!property) return

    const currentFeatured = properties.filter(p => p.featured).length
    
    // Se está tentando marcar como destaque e já tem 5
    if (!property.featured && currentFeatured >= 5) {
      alert("Você já tem 5 imóveis em destaque. Desmarque um para adicionar outro.")
      return
    }

    const updated = properties.map(p =>
      p.id === id ? { ...p, featured: !p.featured } : p
    )
    saveProperties(updated)
  }

  const getFeaturedProperties = () => {
    return properties.filter(p => p.featured)
  }

  return {
    properties,
    loading,
    addProperty,
    updateProperty,
    deleteProperty,
    toggleFeatured,
    getFeaturedProperties
  }
}


