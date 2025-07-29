"use client"

import { useEffect, useState } from "react"
import LoginPage from "@/components/login-page"
import ProductDashboard from "@/components/product-dashboard"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showDashboard, setShowDashboard] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("b4you-token")
    if (token) {
      setIsAuthenticated(true)
      
      setTimeout(() => setShowDashboard(true), 100)
    }
    setIsLoading(false)
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    setTimeout(() => setShowDashboard(true), 100)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    )
  }

  return isAuthenticated ? (
    <div className={`transition-opacity duration-1000 ease-in-out ${showDashboard ? "opacity-100" : "opacity-0"}`}>
      <ProductDashboard />
    </div>
  ) : (
    <LoginPage onLoginSuccess={handleLoginSuccess} />
  )
}
