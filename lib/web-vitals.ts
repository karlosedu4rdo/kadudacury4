// Core Web Vitals optimization and monitoring

// Import web-vitals dynamically to avoid build errors
let webVitals: any = null

/**
 * Core Web Vitals thresholds
 */
export const VITALS_THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 800, // Time to First Byte (ms)
}

/**
 * Performance score calculation
 */
export function calculatePerformanceScore(metrics: {
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  ttfb?: number
}): number {
  let score = 100
  
  if (metrics.lcp && metrics.lcp > VITALS_THRESHOLDS.LCP) {
    score -= Math.min(30, (metrics.lcp - VITALS_THRESHOLDS.LCP) / 100)
  }
  
  if (metrics.fid && metrics.fid > VITALS_THRESHOLDS.FID) {
    score -= Math.min(25, (metrics.fid - VITALS_THRESHOLDS.FID) * 2)
  }
  
  if (metrics.cls && metrics.cls > VITALS_THRESHOLDS.CLS) {
    score -= Math.min(25, metrics.cls * 100)
  }
  
  if (metrics.fcp && metrics.fcp > VITALS_THRESHOLDS.FCP) {
    score -= Math.min(20, (metrics.fcp - VITALS_THRESHOLDS.FCP) / 50)
  }
  
  return Math.max(0, Math.round(score))
}

/**
 * Optimize LCP (Largest Contentful Paint)
 */
export function optimizeLCP() {
  // Preload critical images
  const criticalImages = [
    '/modern-apartment-building-itaquera.jpg',
    '/tall-apartment-building-vila-re.jpg',
  ]
  
  criticalImages.forEach((src) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
  
  // Optimize font loading
  const fontLink = document.createElement('link')
  fontLink.rel = 'preload'
  fontLink.as = 'font'
  fontLink.type = 'font/woff2'
  fontLink.crossOrigin = 'anonymous'
  fontLink.href = '/fonts/inter.woff2'
  document.head.appendChild(fontLink)
}

/**
 * Optimize FID (First Input Delay)
 */
export function optimizeFID() {
  // Defer non-critical JavaScript
  const scripts = document.querySelectorAll('script[src]')
  scripts.forEach((script) => {
    if (!script.hasAttribute('defer') && !script.hasAttribute('async')) {
      script.setAttribute('defer', '')
    }
  })
  
  // Use requestIdleCallback for non-critical tasks
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Load non-critical resources
      loadNonCriticalResources()
    })
  }
}

/**
 * Optimize CLS (Cumulative Layout Shift)
 */
export function optimizeCLS() {
  // Reserve space for images
  const images = document.querySelectorAll('img')
  images.forEach((img) => {
    if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
      img.style.aspectRatio = '16/9'
      img.style.width = '100%'
    }
  })
  
  // Reserve space for dynamic content
  const dynamicElements = document.querySelectorAll('[data-dynamic]')
  dynamicElements.forEach((element) => {
    const htmlElement = element as HTMLElement
    htmlElement.style.minHeight = '200px'
  })
}

/**
 * Optimize FCP (First Contentful Paint)
 */
export function optimizeFCP() {
  // Inline critical CSS
  const criticalCSS = `
    .hero-section { display: block; }
    .header { display: flex; }
    .loading { opacity: 0; }
  `
  
  const style = document.createElement('style')
  style.textContent = criticalCSS
  document.head.insertBefore(style, document.head.firstChild)
  
  // Remove render-blocking resources
  const renderBlocking = document.querySelectorAll('link[rel="stylesheet"]:not([media="print"])')
  renderBlocking.forEach((link) => {
    const linkElement = link as HTMLLinkElement
    if (!linkElement.hasAttribute('data-critical')) {
      linkElement.media = 'print'
      linkElement.onload = () => {
        linkElement.media = 'all'
      }
    }
  })
}

/**
 * Optimize TTFB (Time to First Byte)
 */
export function optimizeTTFB() {
  // Enable compression
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
  }
  
  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ]
  
  preconnectDomains.forEach((domain) => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

/**
 * Load non-critical resources
 */
function loadNonCriticalResources() {
  // Load analytics
  if (typeof window !== 'undefined' && !(window as any).gtag) {
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
    script.async = true
    document.head.appendChild(script)
  }
  
  // Load social media widgets
  const socialScripts = [
    'https://platform.twitter.com/widgets.js',
    'https://connect.facebook.net/en_US/sdk.js',
  ]
  
  socialScripts.forEach((src) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  })
}

/**
 * Monitor Core Web Vitals
 */
export function monitorWebVitals() {
  if (typeof window === 'undefined') return
  
  console.log('Web Vitals monitoring initialized')
  
  // Simple performance monitoring
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const loadTime = navigation.loadEventEnd - navigation.fetchStart
    console.log('Page load time:', loadTime)
  })
}

/**
 * Initialize all Web Vitals optimizations
 */
export function initWebVitalsOptimizations() {
  optimizeLCP()
  optimizeFID()
  optimizeCLS()
  optimizeFCP()
  optimizeTTFB()
  monitorWebVitals()
}

/**
 * Performance budget monitoring
 */
export function checkPerformanceBudget() {
  const budget = {
    js: 250000, // 250KB
    css: 50000,  // 50KB
    images: 1000000, // 1MB
    fonts: 100000, // 100KB
  }
  
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
  
  resources.forEach((resource) => {
    const size = resource.transferSize
    const type = resource.name.split('.').pop()?.toLowerCase()
    
    if (type === 'js' && size > budget.js) {
      console.warn(`JavaScript bundle exceeds budget: ${size} bytes`)
    }
    
    if (type === 'css' && size > budget.css) {
      console.warn(`CSS bundle exceeds budget: ${size} bytes`)
    }
    
    if (['jpg', 'jpeg', 'png', 'webp', 'avif'].includes(type || '') && size > budget.images) {
      console.warn(`Image exceeds budget: ${size} bytes`)
    }
  })
}
