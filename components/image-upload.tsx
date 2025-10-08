"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, Upload, Star } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  images: string[]
  coverImageIndex: number
  onImagesChange: (images: string[]) => void
  onCoverChange: (index: number) => void
}

export function ImageUpload({ images, coverImageIndex, onImagesChange, onCoverChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const newImages: string[] = []

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Validação de tipo
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} não é uma imagem válida`)
          continue
        }

        // Validação de tamanho (máx 2MB por imagem)
        if (file.size > 2 * 1024 * 1024) {
          alert(`${file.name} é muito grande. Máximo 2MB por imagem.`)
          continue
        }

        // Converter para base64
        const base64 = await fileToBase64(file)
        newImages.push(base64)
      }

      // Adiciona as novas imagens ao array existente
      onImagesChange([...images, ...newImages])
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      alert('Erro ao processar imagens. Tente novamente.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
    
    // Ajusta o índice da capa
    if (newImages.length === 0) {
      // Sem imagens, reseta para 0
      onCoverChange(0)
    } else if (index === coverImageIndex) {
      // Se removeu a capa, a primeira imagem vira a capa
      onCoverChange(0)
    } else if (index < coverImageIndex) {
      // Se removeu antes da capa, ajusta o índice
      onCoverChange(coverImageIndex - 1)
    }
  }

  const handleSetCover = (index: number) => {
    onCoverChange(index)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          {uploading ? 'Processando...' : 'Adicionar Imagens'}
        </Button>
        <p className="text-xs text-gray-500">
          Máx 2MB por imagem. Formatos: JPG, PNG, WebP
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative aspect-video rounded-lg overflow-hidden border-2 ${
                index === coverImageIndex ? 'border-yellow-500' : 'border-gray-200'
              }`}
            >
              <Image
                src={img}
                alt={`Imagem ${index + 1}`}
                fill
                className="object-cover"
              />
              
              {/* Badge de capa */}
              {index === coverImageIndex && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  Capa
                </div>
              )}

              {/* Botões de ação */}
              <div className="absolute top-2 right-2 flex gap-1">
                {index !== coverImageIndex && (
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className="h-7 w-7 bg-white/90 hover:bg-white"
                    onClick={() => handleSetCover(index)}
                    title="Definir como capa"
                  >
                    <Star className="w-3 h-3" />
                  </Button>
                )}
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="h-7 w-7"
                  onClick={() => handleRemoveImage(index)}
                  title="Remover imagem"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>

              {/* Número da imagem */}
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Nenhuma imagem adicionada</p>
          <p className="text-xs text-gray-500">
            Clique em "Adicionar Imagens" para fazer upload
          </p>
        </div>
      )}
    </div>
  )
}

