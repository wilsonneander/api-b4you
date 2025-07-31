"use client"

import { useEffect, useState } from "react"
import LoginPage from "@/components/login-page"
import ProductDashboard from "@/components/product-dashboard"
import Cookies from 'js-cookie';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get("token")
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    )
  }

  return isAuthenticated ? (
    <div className={`transition-opacity duration-1000 ease-in-out opacity-100`}>
      <ProductDashboard />
    </div>
  ) : (
    <LoginPage onLoginSuccess={handleLoginSuccess} />
  )
}
