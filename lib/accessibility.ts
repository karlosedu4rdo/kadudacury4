// Accessibility utilities and helpers

/**
 * Skip to main content link
 */
export function createSkipToMainContent() {
  if (typeof window === 'undefined') return null
  
  const link = document.createElement('a')
  link.href = '#main-content'
  link.textContent = 'Pular para o conteúdo principal'
  link.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
  
  return link
}

/**
 * Focus trap for modals and dropdowns
 */
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
  }

  element.addEventListener('keydown', handleKeyDown)
  firstElement?.focus()

  return () => {
    element.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Announce changes to screen readers
 */
export function announceToScreenReader(message: string) {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

/**
 * Get accessible color contrast ratio
 */
export function getContrastRatio(color1: string, color2: string): number {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd parse the colors and calculate luminance
  return 4.5 // Placeholder - should be calculated properly
}

/**
 * Check if element is visible to screen readers
 */
export function isVisibleToScreenReader(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element)
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    element.getAttribute('aria-hidden') !== 'true'
  )
}

/**
 * Generate accessible IDs for form elements
 */
export function generateAccessibleId(prefix: string, suffix?: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 9)
  return `${prefix}-${suffix || random}-${timestamp}`
}

/**
 * Keyboard navigation helpers
 */
export const keyboardNavigation = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  HOME: 'Home',
  END: 'End',
}

/**
 * ARIA live regions for dynamic content
 */
export function createLiveRegion(level: 'polite' | 'assertive' = 'polite') {
  const region = document.createElement('div')
  region.setAttribute('aria-live', level)
  region.setAttribute('aria-atomic', 'true')
  region.className = 'sr-only'
  document.body.appendChild(region)
  
  return {
    announce: (message: string) => {
      region.textContent = message
    },
    destroy: () => {
      document.body.removeChild(region)
    }
  }
}

/**
 * Focus management utilities
 */
export const focusManagement = {
  /**
   * Focus first focusable element
   */
  focusFirst: (container: HTMLElement) => {
    const focusable = container.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement
    focusable?.focus()
  },
  
  /**
   * Focus last focusable element
   */
  focusLast: (container: HTMLElement) => {
    const focusable = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const last = focusable[focusable.length - 1] as HTMLElement
    last?.focus()
  },
  
  /**
   * Store and restore focus
   */
  storeFocus: () => {
    return document.activeElement as HTMLElement
  },
  
  restoreFocus: (element: HTMLElement) => {
    element?.focus()
  }
}

/**
 * Screen reader only text utility
 */
export function createScreenReaderOnly(text: string) {
  if (typeof window === 'undefined') return null
  
  const span = document.createElement('span')
  span.textContent = text
  span.className = 'sr-only'
  
  return span
}
