/**
 * Sistema de persistência híbrido
 * - Usa localStorage para cache local rápido
 * - Sincroniza com API para persistência na Vercel
 * - Funciona offline e online
 */

const IS_CLIENT = typeof window !== 'undefined'

export class Storage {
  private static async syncWithAPI(key: string, data: any): Promise<void> {
    if (!IS_CLIENT) return
    
    try {
      const endpoint = `/api/${key}`
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.warn(`Failed to sync ${key} with API:`, error)
      // Falha silenciosa - localStorage ainda funciona
    }
  }

  private static async loadFromAPI(key: string): Promise<any | null> {
    if (!IS_CLIENT) return null
    
    try {
      const endpoint = `/api/${key}`
      const response = await fetch(endpoint, {
        method: 'GET',
        cache: 'no-store',
      })
      
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.warn(`Failed to load ${key} from API:`, error)
    }
    
    return null
  }

  static async set(key: string, value: any, version?: string): Promise<void> {
    if (!IS_CLIENT) return

    const data = { [key]: value, version }
    
    // Salva no localStorage imediatamente (fast)
    try {
      localStorage.setItem(key, JSON.stringify(value))
      if (version) {
        localStorage.setItem(`${key}_version`, version)
      }
    } catch (error) {
      console.error(`Failed to save ${key} to localStorage:`, error)
    }

    // Sincroniza com API em background (slow but persistent)
    this.syncWithAPI(key, data).catch(console.warn)
  }

  static async get<T>(key: string, defaultValue: T, currentVersion?: string): Promise<T> {
    if (!IS_CLIENT) return defaultValue

    // 1. Tenta carregar do localStorage primeiro (rápido)
    try {
      const stored = localStorage.getItem(key)
      const version = localStorage.getItem(`${key}_version`)
      
      if (stored && (!currentVersion || version === currentVersion)) {
        return JSON.parse(stored) as T
      }
    } catch (error) {
      console.warn(`Failed to load ${key} from localStorage:`, error)
    }

    // 2. Tenta carregar da API (pode estar vazio em primeira execução)
    const apiData = await this.loadFromAPI(key)
    if (apiData && apiData[key]) {
      // Atualiza localStorage com dados da API
      try {
        localStorage.setItem(key, JSON.stringify(apiData[key]))
        if (apiData.version) {
          localStorage.setItem(`${key}_version`, apiData.version)
        }
      } catch (error) {
        console.warn(`Failed to cache API data in localStorage:`, error)
      }
      
      return apiData[key] as T
    }

    // 3. Retorna valor padrão e inicializa
    await this.set(key, defaultValue, currentVersion)
    return defaultValue
  }

  static async remove(key: string): Promise<void> {
    if (!IS_CLIENT) return

    try {
      localStorage.removeItem(key)
      localStorage.removeItem(`${key}_version`)
    } catch (error) {
      console.error(`Failed to remove ${key} from localStorage:`, error)
    }
  }

  static clear(): void {
    if (!IS_CLIENT) return

    try {
      localStorage.clear()
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
    }
  }
}

