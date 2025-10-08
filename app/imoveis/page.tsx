"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { PropertyModal } from "@/components/property-modal"
import { Search, MapPin, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSearchParams } from "next/navigation"
import { Suspense, useState, useEffect } from "react"
import { useProperties, type Property } from "@/hooks/use-properties"

function ImoveisContent() {
  const searchParams = useSearchParams()
  const regionParam = searchParams.get("regiao")
  const { properties, loading } = useProperties()
  const [selectedRegion, setSelectedRegion] = useState<string>(regionParam || "all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  useEffect(() => {
    if (regionParam) {
      setSelectedRegion(regionParam)
    }
  }, [regionParam])

  const filteredProperties = properties.filter((property) => {
    const matchesRegion = selectedRegion === "all" || property.region === selectedRegion
    const matchesSearch =
      searchTerm === "" ||
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || property.status === selectedStatus

    return matchesRegion && matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12 md:py-16 opacity-0 animate-fade-in">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">O primeiro passo para o seu Apê!</h1>
          <p className="text-center text-lg mb-8">Encontre seu imóvel</p>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg">
            <div className="grid md:grid-cols-[1fr_auto_auto_auto] gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Buscar por nome</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Ex: Itaquera, Morumbi..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Região</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-[180px] bg-white [&>span]:text-gray-900">
                    <SelectValue placeholder="Selecione a região" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="centro">Centro</SelectItem>
                    <SelectItem value="sul">Sul</SelectItem>
                    <SelectItem value="leste">Leste</SelectItem>
                    <SelectItem value="oeste">Oeste</SelectItem>
                    <SelectItem value="norte">Norte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[180px] bg-white [&>span]:text-gray-900">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Em Construção">Em Construção</SelectItem>
                    <SelectItem value="Pronto Para Morar">Pronto Para Morar</SelectItem>
                    <SelectItem value="Lançamento">Lançamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full md:w-auto transition-all duration-300 hover:scale-105">
                  Pesquisar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <p className="text-gray-600 mb-6">
            Mostrando {filteredProperties.length} {filteredProperties.length === 1 ? "imóvel" : "imóveis"}
            {selectedRegion !== "all" &&
              ` na região ${selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}`}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property, index) => (
              <div
                key={property.id}
                onClick={() => setSelectedProperty(property)}
                className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 group opacity-0 animate-fade-in-up animation-delay-${(index % 4) * 200}`}
              >
                <div className="relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-blue-500 text-white">{property.badge}</Badge>
                  <button
                    className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle favorite logic here
                    }}
                  >
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <Badge
                    className={`absolute bottom-3 left-3 ${
                      property.status === "Pronto Para Morar"
                        ? "bg-green-600"
                        : property.status === "Lançamento"
                          ? "bg-blue-600"
                          : "bg-orange-600"
                    } text-white`}
                  >
                    {property.status}
                  </Badge>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{property.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{property.details}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum imóvel encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />

      {selectedProperty && <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
    </main>
  )
}

export default function ImoveisPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ImoveisContent />
    </Suspense>
  )
}
