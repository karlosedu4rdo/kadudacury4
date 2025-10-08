"use client"

import { useState, useEffect } from "react"

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth")
    setIsAuthenticated(auth === "true")
  }, [])

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "admin") {
      localStorage.setItem("admin-auth", "true")
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("admin-auth")
    setIsAuthenticated(false)
  }

  return { isAuthenticated, login, logout }
}


