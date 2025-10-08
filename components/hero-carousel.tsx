"use client"

import { useState, useEffect, useCallback, memo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useBanners } from "@/hooks/use-banners"

const HeroCarousel = memo(function HeroCarousel() {
  const { banners, loading } = useBanners()
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }, [])

  useEffect(() => {
    if (banners.length === 0) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 8000) // Aumentado para 8s para reduzir interações

    return () => clearInterval(timer)
  }, [banners.length])

  if (loading || banners.length === 0) {
    return (
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="relative w-full h-[384px] md:h-[480px] lg:h-[576px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-gray-900 overflow-hidden">
      {/* Carousel Container */}
      <div className="relative w-full h-[384px] md:h-[480px] lg:h-[576px] carousel-container">
        <Image 
          src={banners[currentSlide]?.image || "/placeholder.svg"} 
          alt={banners[currentSlide]?.alt || "Banner"} 
          fill
          priority
          sizes="100vw"
          className="object-cover hero-image"
          quality={85}
        />

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full w-12 h-12 z-10 transition-all duration-200 will-change-transform"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full w-12 h-12 z-10 transition-all duration-200 will-change-transform"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 carousel-dot ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50 w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
})

export { HeroCarousel }
