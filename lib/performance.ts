// Performance utilities and optimizations

/**
 * Debounce function to limit function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function to limit function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Intersection Observer for lazy loading
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined') return null
  
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  })
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return
  
  // Preload critical images
  const criticalImages = [
    '/modern-apartment-building-itaquera.jpg',
    '/tall-apartment-building-vila-re.jpg',
    '/modern-residential-building-vila-sonia.jpg',
  ]
  
  criticalImages.forEach((src) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}

/**
 * Optimize images with lazy loading
 */
export function optimizeImageLoading() {
  if (typeof window === 'undefined') return
  
  const images = document.querySelectorAll('img[data-src]')
  const imageObserver = createIntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        img.src = img.dataset.src || ''
        img.classList.remove('lazy')
        imageObserver?.unobserve(img)
      }
    })
  })
  
  images.forEach((img) => imageObserver?.observe(img))
}

/**
 * Performance monitoring
 */
export function measurePerformance() {
  if (typeof window === 'undefined') return
  
  // Simple performance monitoring without external dependencies
  console.log('Performance monitoring initialized')
  
  // Monitor page load time
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
    console.log(`Page load time: ${loadTime}ms`)
  })
}

/**
 * Optimize scroll performance
 */
export function optimizeScroll() {
  if (typeof window === 'undefined') return
  
  let ticking = false
  
  function updateScrollPosition() {
    // Add scroll-based optimizations here
    ticking = false
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition)
      ticking = true
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true })
}

/**
 * Initialize all performance optimizations
 */
export function initPerformanceOptimizations() {
  preloadCriticalResources()
  optimizeImageLoading()
  measurePerformance()
  optimizeScroll()
}

/**
 * Memory cleanup
 */
export function cleanup() {
  // Cleanup event listeners and observers
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', () => {})
  }
}