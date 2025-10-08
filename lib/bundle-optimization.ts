// Bundle optimization utilities

/**
 * Lazy load components with error boundaries
 */
export function lazyLoadComponent(importFunc: () => Promise<any>) {
  // Simple lazy loading utility
  return importFunc().catch((error) => {
    console.warn('Failed to load component:', error)
    return { default: () => null }
  })
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return
  
  // Preload critical CSS
  const criticalCSS = document.createElement('link')
  criticalCSS.rel = 'preload'
  criticalCSS.as = 'style'
  criticalCSS.href = '/styles/critical.css'
  document.head.appendChild(criticalCSS)
  
  // Preload critical fonts
  const fontPreload = document.createElement('link')
  fontPreload.rel = 'preload'
  fontPreload.as = 'font'
  fontPreload.type = 'font/woff2'
  fontPreload.crossOrigin = 'anonymous'
  fontPreload.href = '/fonts/inter.woff2'
  document.head.appendChild(fontPreload)
}

/**
 * Code splitting utilities
 */
export const codeSplitting = {
  /**
   * Split by route
   */
  splitByRoute: (route: string) => {
    return () => import(`../app/${route}/page`)
  },
  
  /**
   * Split by feature
   */
  splitByFeature: (feature: string) => {
    return () => import(`../components/${feature}`)
  },
  
  /**
   * Split heavy libraries
   */
  splitHeavyLibrary: (library: string) => {
    return () => import(library)
  }
}

/**
 * Tree shaking helpers
 */
export const treeShaking = {
  /**
   * Import only what you need from date-fns
   */
  dateFns: {
    format: () => import('date-fns/format'),
    parseISO: () => import('date-fns/parseISO'),
    isAfter: () => import('date-fns/isAfter'),
  }
}

/**
 * Bundle analyzer configuration
 */
export const bundleConfig = {
  // Webpack bundle analyzer
  analyze: process.env.ANALYZE === 'true',
  
  // Bundle size limits
  limits: {
    js: 250000, // 250KB
    css: 50000,  // 50KB
    images: 1000000, // 1MB
  },
  
  // Chunk splitting strategy
  chunks: {
    vendor: ['react', 'react-dom', 'next'],
    ui: ['@radix-ui/react-*'],
    utils: ['lodash', 'date-fns'],
  }
}

/**
 * Performance monitoring
 */
export function monitorBundlePerformance() {
  if (typeof window === 'undefined') return
  
  // Monitor bundle size
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'resource') {
        const resource = entry as PerformanceResourceTiming
        console.log(`Resource loaded: ${resource.name} (${resource.transferSize} bytes)`)
      }
    }
  })
  
  observer.observe({ entryTypes: ['resource'] })
  
  // Monitor JavaScript execution time
  const jsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'measure') {
        console.log(`Performance measure: ${entry.name} (${entry.duration}ms)`)
      }
    }
  })
  
  jsObserver.observe({ entryTypes: ['measure'] })
}

/**
 * Critical resource hints
 */
export function addResourceHints() {
  if (typeof window === 'undefined') return
  
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  ]
  
  hints.forEach(({ rel, href, crossOrigin }) => {
    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    if (crossOrigin) link.crossOrigin = crossOrigin
    document.head.appendChild(link)
  })
}

/**
 * Initialize all optimizations
 */
export function initBundleOptimizations() {
  preloadCriticalResources()
  addResourceHints()
  monitorBundlePerformance()
}
