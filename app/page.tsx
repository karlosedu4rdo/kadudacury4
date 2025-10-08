import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel"
import { ApartmentsSection } from "@/components/apartments-section"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { Suspense } from "react"
import dynamic from "next/dynamic"

// Lazy load components that are not immediately visible (below the fold)
const LocationSection = dynamic(() => import("@/components/location-section").then(mod => ({ default: mod.LocationSection })))
const ReferralSection = dynamic(() => import("@/components/referral-section").then(mod => ({ default: mod.ReferralSection })))
const RequirementsSection = dynamic(() => import("@/components/requirements-section").then(mod => ({ default: mod.RequirementsSection })))
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section").then(mod => ({ default: mod.TestimonialsSection })))
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => ({ default: mod.ContactSection })))
const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })))
const WhatsAppButton = dynamic(() => import("@/components/whatsapp-button").then(mod => ({ default: mod.WhatsAppButton })))

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroCarousel />
      <ApartmentsSection />
      <Suspense fallback={<LoadingSkeleton />}>
        <LocationSection />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <ReferralSection />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <RequirementsSection />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<LoadingSkeleton />}>
        <ContactSection />
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
