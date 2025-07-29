"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface LoginPageProps {
  onLoginSuccess?: () => void
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular login
    setTimeout(() => {
      localStorage.setItem("b4you-token", "fake-jwt-token")
      onLoginSuccess?.()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8">
        <Image src="/b4you-logo.png" alt="B4YOU Logo" width={120} height={60} className="mx-auto" />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-[#2D1B69]">Entre na sua conta</CardTitle>
          <p className="text-sm text-gray-600 mt-2">Acesse sua plataforma de gestão</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#2D1B69]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-gray-300 focus:border-[#5bebd4] focus:ring-[#5bebd4]"
                placeholder="seu@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#2D1B69]">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-gray-300 focus:border-[#5bebd4] focus:ring-[#5bebd4]"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5bebd4] hover:bg-[#4dd4bd] text-white font-medium transition-all duration-200 bg-[rgba(32,180,145,1)]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Entrando...
                </div>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">© 2025 B4You. Wilson Neander Todos os direitos reservados.</p>
      </div>
    </div>
  )
}
