"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useProperties, type Property } from "@/hooks/use-properties"
import { useBanners, type Banner } from "@/hooks/use-banners"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ImageUpload } from "@/components/image-upload"
import { 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Home,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Maximize,
  Star,
  Image as ImageIcon
} from "lucide-react"

type TabType = "properties" | "banners"

export default function AdminPage() {
  const { isAuthenticated, login, logout } = useAuth()
  const { properties, loading, addProperty, updateProperty, deleteProperty, toggleFeatured } = useProperties()
  const { banners, loading: bannersLoading, addBanner, updateBanner, deleteBanner } = useBanners()
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<TabType>("properties")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  
  // Estados para banners
  const [editingBannerId, setEditingBannerId] = useState<number | null>(null)
  const [isAddingBanner, setIsAddingBanner] = useState(false)
  const [bannerFormData, setBannerFormData] = useState<Omit<Banner, "id">>({
    image: "",
    alt: "",
    title: "",
    description: ""
  })
  
  // Refs para scroll automático
  const propertyFormRef = useRef<HTMLDivElement>(null)
  const bannerFormRef = useRef<HTMLDivElement>(null)
  
  const [formData, setFormData] = useState<Omit<Property, "id">>({
    name: "",
    location: "",
    region: "leste",
    details: "",
    status: "Em Construção",
    statusColor: "bg-orange-600",
    image: "",
    badge: "",
    price: "",
    bedrooms: 2,
    bathrooms: 1,
    area: "",
    zone: "Sul",
    featured: false,
    description: "",
    features: [],
    images: [],
    coverImageIndex: 0
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(username, password)) {
      setError("")
    } else {
      setError("Credenciais inválidas")
    }
  }

  const handleEdit = (property: Property) => {
    setEditingId(property.id)
    setFormData(property)
    setIsAdding(false)
  }

  // Scroll para o formulário quando abrir
  useEffect(() => {
    if ((editingId || isAdding) && propertyFormRef.current) {
      setTimeout(() => {
        propertyFormRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      }, 100)
    }
  }, [editingId, isAdding])

  useEffect(() => {
    if ((editingBannerId || isAddingBanner) && bannerFormRef.current) {
      setTimeout(() => {
        bannerFormRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      }, 100)
    }
  }, [editingBannerId, isAddingBanner])

  const handleSave = () => {
    // Se houver imagens, usa a imagem de capa como imagem principal
    const dataToSave = { ...formData }
    if (dataToSave.images && dataToSave.images.length > 0) {
      const coverIndex = dataToSave.coverImageIndex || 0
      dataToSave.image = dataToSave.images[coverIndex]
    }

    if (editingId) {
      updateProperty(editingId, dataToSave)
      setEditingId(null)
    } else if (isAdding) {
      addProperty(dataToSave)
      setIsAdding(false)
    }
    resetForm()
  }

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este imóvel?")) {
      deleteProperty(id)
    }
  }

  const handleAddNew = () => {
    resetForm()
    setIsAdding(true)
    setEditingId(null)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      location: "",
      region: "leste",
      details: "",
      status: "Em Construção",
      statusColor: "bg-orange-600",
      image: "",
      badge: "",
      price: "",
      bedrooms: 2,
      bathrooms: 1,
      area: "",
      zone: "Sul",
      featured: false,
      description: "",
      features: [],
      images: [],
      coverImageIndex: 0
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsAdding(false)
    resetForm()
  }

  // Funções para gerenciar banners
  const handleEditBanner = (banner: Banner) => {
    setEditingBannerId(banner.id)
    setBannerFormData(banner)
    setIsAddingBanner(false)
  }

  const handleSaveBanner = () => {
    if (editingBannerId) {
      updateBanner(editingBannerId, bannerFormData)
      setEditingBannerId(null)
    } else if (isAddingBanner) {
      addBanner(bannerFormData)
      setIsAddingBanner(false)
    }
    resetBannerForm()
  }

  const handleDeleteBanner = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este banner?")) {
      deleteBanner(id)
    }
  }

  const handleAddNewBanner = () => {
    resetBannerForm()
    setIsAddingBanner(true)
    setEditingBannerId(null)
  }

  const resetBannerForm = () => {
    setBannerFormData({
      image: "",
      alt: "",
      title: "",
      description: ""
    })
  }

  const handleCancelBanner = () => {
    setEditingBannerId(null)
    setIsAddingBanner(false)
    resetBannerForm()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <Home className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Faça login para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuário
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>

          <div className="mt-4 text-xs text-gray-500 text-center">
            Credenciais padrão: admin / admin
          </div>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Home className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">
              Dashboard Admin - Kakodacury
            </h1>
          </div>
          <Button variant="outline" onClick={logout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("properties")}
            className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 ${
              activeTab === "properties"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Home className="w-5 h-5" />
            Imóveis
          </button>
          <button
            onClick={() => setActiveTab("banners")}
            className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 ${
              activeTab === "banners"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            Banners do Carrossel
          </button>
        </div>

        {/* Conteúdo da aba de Imóveis */}
        {activeTab === "properties" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="text-sm text-gray-600 mb-2">Total de Imóveis</div>
            <div className="text-3xl font-bold text-gray-900">{properties.length}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-gray-600 mb-2">Em Destaque</div>
            <div className="text-3xl font-bold text-yellow-600 flex items-center gap-2">
              {properties.filter(p => p.featured).length}
              <Star className="w-6 h-6 fill-yellow-600" />
            </div>
            <div className="text-xs text-gray-500 mt-1">Máximo: 5</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-gray-600 mb-2">Em Construção</div>
            <div className="text-3xl font-bold text-orange-600">
              {properties.filter(p => p.status === "Em Construção").length}
            </div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-gray-600 mb-2">Pronto para Morar</div>
            <div className="text-3xl font-bold text-green-600">
              {properties.filter(p => p.status === "Pronto para Morar" || p.status === "Pronto Para Morar").length}
            </div>
          </Card>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          <Button onClick={handleAddNew} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Adicionar Novo Imóvel
          </Button>
        </div>

        {/* Form */}
        {(editingId || isAdding) && (
          <Card ref={propertyFormRef} className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {isAdding ? "Adicionar Novo Imóvel" : "Editar Imóvel"}
              </h2>
              <Button variant="ghost" size="icon" onClick={handleCancel}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Empreendimento
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: 9 de Julho"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localização
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: Vila Prudente"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Região
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="centro">Centro</option>
                  <option value="sul">Sul</option>
                  <option value="leste">Leste</option>
                  <option value="oeste">Oeste</option>
                  <option value="norte">Norte</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detalhes
                </label>
                <Input
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Ex: Studios, 1 Dorm., + Office"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço
                </label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Ex: R$ 266.000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => {
                    const status = e.target.value
                    let statusColor = "bg-gray-600"
                    if (status === "Em Construção") statusColor = "bg-orange-600"
                    else if (status === "Pronto para Morar") statusColor = "bg-green-600"
                    else if (status === "Lançamento") statusColor = "bg-blue-600"
                    setFormData({ ...formData, status, statusColor })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Em Construção">Em Construção</option>
                  <option value="Pronto para Morar">Pronto para Morar</option>
                  <option value="Lançamento">Lançamento</option>
                  <option value="Em Breve">Em Breve</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zona
                </label>
                <select
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Sul">Sul</option>
                  <option value="Norte">Norte</option>
                  <option value="Leste">Leste</option>
                  <option value="Oeste">Oeste</option>
                  <option value="Centro">Centro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Badge
                </label>
                <Input
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="Ex: Minha Casa Minha Vida"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quartos
                </label>
                <Input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banheiros
                </label>
                <Input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área
                </label>
                <Input
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="Ex: 45m²"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL da Imagem (alternativa)
                </label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Ex: /modern-apartment.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Opcional: Use este campo apenas se não fizer upload de imagens abaixo
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Galeria de Imagens
                </label>
                <ImageUpload
                  images={formData.images || []}
                  coverImageIndex={formData.coverImageIndex || 0}
                  onImagesChange={(images) => setFormData({ ...formData, images })}
                  onCoverChange={(index) => setFormData({ ...formData, coverImageIndex: index })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição completa do empreendimento..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Características (uma por linha)
                </label>
                <textarea
                  value={formData.features?.join('\n') || ""}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value.split('\n').filter(f => f.trim()) })}
                  placeholder="Área de lazer&#10;Piscina&#10;Academia&#10;Playground"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Salvar
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          </Card>
        )}

        {/* Properties List */}
        <div className="space-y-4">
          {properties.map((property) => (
            <Card key={property.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{property.name}</h3>
                    <span className={`text-white text-xs px-2 py-1 rounded ${property.statusColor}`}>
                      {property.status}
                    </span>
                    {property.badge && (
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                        {property.badge}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      {property.price}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Bed className="w-4 h-4" />
                      {property.bedrooms} quartos
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Bath className="w-4 h-4" />
                      {property.bathrooms} banheiros
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Maximize className="w-4 h-4" />
                      {property.area}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      Zona {property.zone}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleFeatured(property.id)}
                    className={property.featured ? "text-yellow-600 hover:text-yellow-700" : "text-gray-400 hover:text-yellow-600"}
                    title={property.featured ? "Remover do destaque" : "Adicionar ao destaque"}
                  >
                    <Star className={`w-4 h-4 ${property.featured ? 'fill-yellow-600' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(property)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(property.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <Home className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Nenhum imóvel cadastrado ainda.</p>
            <Button onClick={handleAddNew} className="mt-4">
              Adicionar Primeiro Imóvel
            </Button>
          </div>
        )}
          </>
        )}

        {/* Conteúdo da aba de Banners */}
        {activeTab === "banners" && (
          <>
            {/* Stats de Banners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <div className="text-sm text-gray-600 mb-2">Total de Banners</div>
                <div className="text-3xl font-bold text-gray-900">{banners.length}</div>
              </Card>
              <Card className="p-6">
                <div className="text-sm text-gray-600 mb-2">Rotação do Carrossel</div>
                <div className="text-3xl font-bold text-blue-600">8s</div>
                <div className="text-xs text-gray-500 mt-1">Tempo entre slides</div>
              </Card>
            </div>

            {/* Add Banner Button */}
            <div className="mb-6">
              <Button onClick={handleAddNewBanner} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Adicionar Novo Banner
              </Button>
            </div>

            {/* Banner Form */}
            {(editingBannerId || isAddingBanner) && (
              <Card ref={bannerFormRef} className="p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {isAddingBanner ? "Adicionar Novo Banner" : "Editar Banner"}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={handleCancelBanner}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título (opcional)
                    </label>
                    <Input
                      value={bannerFormData.title || ""}
                      onChange={(e) => setBannerFormData({ ...bannerFormData, title: e.target.value })}
                      placeholder="Ex: Mega Feirão de Apartamentos"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição (opcional)
                    </label>
                    <Input
                      value={bannerFormData.description || ""}
                      onChange={(e) => setBannerFormData({ ...bannerFormData, description: e.target.value })}
                      placeholder="Ex: Condições especiais"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Texto Alternativo (alt)
                    </label>
                    <Input
                      value={bannerFormData.alt}
                      onChange={(e) => setBannerFormData({ ...bannerFormData, alt: e.target.value })}
                      placeholder="Ex: Banner promocional de apartamentos"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Importante para acessibilidade e SEO
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imagem do Banner
                    </label>
                    <ImageUpload
                      images={bannerFormData.image ? [bannerFormData.image] : []}
                      coverImageIndex={0}
                      onImagesChange={(images) => setBannerFormData({ ...bannerFormData, image: images[0] || "" })}
                      onCoverChange={() => {}}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Tamanho recomendado: 1920x600px (proporção 16:5)
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={handleSaveBanner} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Salvar Banner
                  </Button>
                  <Button variant="outline" onClick={handleCancelBanner}>
                    Cancelar
                  </Button>
                </div>
              </Card>
            )}

            {/* Banners List */}
            <div className="space-y-4">
              {banners.map((banner) => (
                <Card key={banner.id} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    {/* Preview da imagem */}
                    <div className="flex-shrink-0 w-48 h-32 relative rounded-lg overflow-hidden border-2 border-gray-200">
                      {banner.image && (
                        <img
                          src={banner.image}
                          alt={banner.alt}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {!banner.image && (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Informações */}
                    <div className="flex-1">
                      {banner.title && (
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{banner.title}</h3>
                      )}
                      {banner.description && (
                        <p className="text-sm text-gray-600 mb-2">{banner.description}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        <strong>Alt:</strong> {banner.alt}
                      </p>
                    </div>

                    {/* Botões de ação */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditBanner(banner)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteBanner(banner.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {banners.length === 0 && (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Nenhum banner cadastrado ainda.</p>
                <Button onClick={handleAddNewBanner} className="mt-4">
                  Adicionar Primeiro Banner
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}


