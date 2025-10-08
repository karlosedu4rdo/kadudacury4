"use client"

import Link from "next/link"
import { X, MapPin, Bed, Bath, Maximize, Calendar, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Property } from "@/hooks/use-properties"

interface PropertyModalProps {
  property: Property
  onClose: () => void
}

export function PropertyModal({ property, onClose }: PropertyModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Property Image */}
        <div className="relative h-64">
          <img src={property.image || "/placeholder.svg"} alt={property.name} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-blue-600 mb-2">{property.name}</h2>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-sm">{property.location}</span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">A partir de</p>
            <p className="text-3xl font-bold text-gray-900">{property.price}</p>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-6 mb-6 pb-6 border-b">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5 text-blue-600" />
              <span className="text-sm">
                <strong>{property.bedrooms}</strong> quartos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5 text-blue-600" />
              <span className="text-sm">
                <strong>{property.bathrooms}</strong> banheiros
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="w-5 h-5 text-blue-600" />
              <span className="text-sm">
                <strong>{property.area}</strong>
              </span>
            </div>
          </div>

          {/* About */}
          {property.description && (
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Sobre o Imóvel</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{property.description}</p>
            </div>
          )}

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Características</h3>
              <div className="grid grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    • {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="https://wa.me/5511921773843?text=Olá! Gostaria de agendar uma visita." target="_blank" rel="noopener noreferrer">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar Visita
              </Link>
            </Button>
            <Button asChild className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              <Link href="https://wa.me/5511921773843?text=Olá! Tenho interesse em saber mais." target="_blank" rel="noopener noreferrer">
                <Heart className="w-4 h-4 mr-2" />
                Tenho Interesse
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
