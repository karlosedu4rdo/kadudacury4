"use client"

import { useState, useEffect } from "react"
import { Storage } from "@/lib/storage"

export interface Banner {
  id: number
  image: string
  alt: string
  title?: string
  description?: string
}

const initialBanners: Banner[] = [
  {
    id: 1,
    image: "/modern-apartment-building-promotion-banner.jpg",
    alt: "Mega Feirão de Apartamentos",
    title: "Mega Feirão de Apartamentos",
    description: "Condições especiais"
  },
  {
    id: 2,
    image: "/real-estate-discount-promotion-banner.jpg",
    alt: "Descontos Especiais",
    title: "Descontos Especiais",
    description: "Até 20% OFF"
  },
  {
    id: 3,
    image: "/apartment-complex-night-lights.jpg",
    alt: "Complexo de Apartamentos",
    title: "Apartamentos Modernos",
    description: "Confira nossas opções"
  },
]

export function useBanners() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBanners = async () => {
      const currentVersion = "1.0"
      
      try {
        const loaded = await Storage.get<Banner[]>("banners", initialBanners, currentVersion)
        setBanners(loaded)
      } catch (error) {
        console.error("Error loading banners:", error)
        setBanners(initialBanners)
      } finally {
        setLoading(false)
      }
    }

    loadBanners()
  }, [])

  const saveBanners = (newBanners: Banner[]) => {
    setBanners(newBanners)
    Storage.set("banners", newBanners, "1.0").catch(console.error)
  }

  const addBanner = (banner: Omit<Banner, "id">) => {
    const newId = Math.max(...banners.map(b => b.id), 0) + 1
    const newBanner = { ...banner, id: newId }
    saveBanners([...banners, newBanner])
  }

  const updateBanner = (id: number, banner: Partial<Banner>) => {
    const updated = banners.map(b =>
      b.id === id ? { ...b, ...banner } : b
    )
    saveBanners(updated)
  }

  const deleteBanner = (id: number) => {
    saveBanners(banners.filter(b => b.id !== id))
  }

  const reorderBanners = (newOrder: Banner[]) => {
    saveBanners(newOrder)
  }

  return {
    banners,
    loading,
    addBanner,
    updateBanner,
    deleteBanner,
    reorderBanners
  }
}

