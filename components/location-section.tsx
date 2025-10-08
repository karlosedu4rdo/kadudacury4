"use client"

import { memo } from "react"
import Link from "next/link"
import Image from "next/image"

const locations = [
  {
    id: 1,
    name: "Centro",
    slug: "centro",
    image: "/sao-paulo-downtown-aerial-view.jpg",
  },
  {
    id: 2,
    name: "Sul",
    slug: "sul",
    image: "/sao-paulo-south-zone-buildings.jpg",
  },
  {
    id: 3,
    name: "Leste",
    slug: "leste",
    image: "/sao-paulo-east-zone-aerial.jpg",
  },
  {
    id: 4,
    name: "Oeste",
    slug: "oeste",
    image: "/green-park-urban-area.jpg",
  },
  {
    id: 5,
    name: "Norte",
    slug: "norte",
    image: "/sao-paulo-north-zone-residential.jpg",
  },
]

export const LocationSection = memo(function LocationSection() {
  return (
    <section className="py-12 md:py-16 bg-blue-600 text-white opacity-0 animate-fade-in-up animation-delay-400">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 text-balance">
            Onde você quer morar?
          </h2>
          <p className="text-gray-200 max-w-3xl mx-auto text-sm md:text-base px-4">
            Descubra as características únicas de cada área da cidade e encontre a opção perfeita para o seu estilo de
            vida!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {locations.map((location, index) => (
            <Link
              key={location.id}
              href={`/imoveis?regiao=${location.slug}`}
              className={`relative group cursor-pointer overflow-hidden rounded-lg aspect-[3/4] card-hover gpu-accelerated animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Image
                src={location.image || "/placeholder.svg"}
                alt={`Zona ${location.name} de São Paulo`}
                fill
                priority={index < 3}
                quality={85}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                loading={index < 3 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent flex items-end justify-center pb-6 md:pb-8">
                <h3 className="text-2xl md:text-3xl font-bold">{location.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
})
