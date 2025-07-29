"use client"

import type React from "react"
import Image from "next/image"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload } from "lucide-react"
import type { Product } from "./product-dashboard"

interface ProductFormProps {
  product?: Product | null
  onSave: (product: Omit<Product, "id">) => void
  onCancel: () => void
}

const categories = ["Cosméticos", "Suplementação Feminina", "Moveleiro", "Eletrônicos", "Moda", "Casa e Decoração"]

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    result: product?.result || "",
    days: product?.days || 30,
    category: product?.category || "",
    image: product?.image || "/placeholder.svg?height=200&width=200",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Em um app real, você faria upload para um servidor
      // Por enquanto, usamos um placeholder
      setFormData((prev) => ({
        ...prev,
        image: `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(prev.name || "product")}`,
      }))
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4 bg-[rgba(18,18,18,1)]">
        <div className="flex items-center gap-4">
          <Button onClick={onCancel} variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Image src="/b4you-logo.png" alt="B4YOU Logo" width={80} height={40} />
        </div>
      </header>

      {/* Form */}
      <main className="px-6 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-[#2D1B69]">{product ? "Editar Produto" : "Novo Produto"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#2D1B69]">
                  Nome do Produto
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                  className="border-gray-300 focus:border-[#5bebd4] focus:ring-[#5bebd4]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="result" className="text-[#2D1B69]">
                  Receita Gerada
                </Label>
                <Input
                  id="result"
                  value={formData.result}
                  onChange={(e) => setFormData((prev) => ({ ...prev, result: e.target.value }))}
                  placeholder="Ex: 386 mil reais em 30 dias"
                  required
                  className="border-gray-300 focus:border-[#5bebd4] focus:ring-[#5bebd4]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="days" className="text-[#2D1B69]">
                  Dias
                </Label>
                <Input
                  id="days"
                  type="number"
                  value={formData.days}
                  onChange={(e) => setFormData((prev) => ({ ...prev, days: Number.parseInt(e.target.value) }))}
                  required
                  min="1"
                  className="border-gray-300 focus:border-[#5bebd4] focus:ring-[#5bebd4]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-[#2D1B69]">
                  Categoria
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="border-gray-300 focus:border-[#5bebd4] focus:ring-[#5bebd4]">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-[#2D1B69]">
                  Upload de Imagem
                </Label>
                <div className="relative">
                  <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <Label
                    htmlFor="image"
                    className="flex items-center justify-center w-full h-12 px-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-[#5bebd4]/5 transition-colors border-[#5bebd4] bg-slate-900"
                  >
                    <Upload className="w-5 h-5 mr-2 text-[#5bebd4]" />
                    <span className="text-[#5bebd4] font-medium">Escolher Ficheiro</span>
                  </Label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="bg-[#028c02] hover:bg-[#026b02] text-white flex-1">
                  Salvar
                </Button>
                <Button type="button" onClick={onCancel} className="bg-[#ff0000] hover:bg-[#cc0000] text-white flex-1">
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
