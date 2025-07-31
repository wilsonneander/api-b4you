"use client"

import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import { Product, ProductFormData, productSchema } from "@/api/use-products"

interface ProductFormProps {
  product: Product | null
  onSubmit: (product: ProductFormData) => void
  onCancel: () => void
}

const categoryMap = {
  "Suplementação Feminina": 1,
  "Moveleiro": 2,
  "Cosméticos": 3,
  "Eletrônicos": 4,
  "Suplementação": 5,
  "Casa e Decoração": 6,
} as const

const categories = Object.keys(categoryMap)

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    defaultValues: product ? {
      name: product.name,
      result: product.result,
      categoryId: product.categoryId,
      days: product.days,
      image: product.image
    } : {}
  })

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 px-6 py-4 bg-[rgba(18,18,18,1)]">
        <div className="flex items-center gap-4">
          <Button onClick={onCancel} variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Image src="/b4you-logo.png" alt="B4YOU Logo" width={80} height={40} />
        </div>
      </header>

      <main className="px-6 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-[#2D1B69]">
              {product ? "Editar Produto" : "Novo Produto"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#2D1B69]">Nome do Produto</Label>
                <Input
                  id="name"
                  className="border-gray-300 focus:border-[#5bebd4] focus:ring-[#5bebd4]"
                  {...register("name", { required: true })}
                />
                <p className='text-red-600'>{errors.name?.message}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="result" className="text-[#2D1B69]">Receita Gerada</Label>
                <Input
                  id="result"
                  placeholder="Ex: 386 mil reais em 30 dias"
                  className="border-gray-300 focus:border-[#5bebd4] focus:ring-[#5bebd4]"
                  {...register("result", { required: true })}
                />
                <p className='text-red-600'>{errors.result?.message}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="days" className="text-[#2D1B69]">Dias</Label>
                <Input
                  id="days"
                  type="number"
                  min="1"
                  className="border-gray-300 focus:border-[#5bebd4] focus:ring-[#5bebd4]"
                  {...register("days", { required: true })}
                />
                <p className='text-red-600'>{errors.days?.message}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-[#2D1B69]">Categoria</Label>
                <Controller
                  name="categoryId"
                  control={control as any}
                  render={({ field }) => (
                    <Select
                    {...register("categoryId", { required: true })}
                    onValueChange={field.onChange}
                    value={field.value ? field.value.toString() : ""}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-[#5bebd4] focus:ring-[#5bebd4]">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={categoryMap[category].toString()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  )}
                />
                <p className='text-red-600'>{errors.categoryId?.message}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-[#2D1B69]">Upload de Imagem</Label>
                <div className="relative">
                  <Input 
                    id="image" 
                    type="text" 
                    {...register("image", { required: true })}
                  />
                  <p className='text-red-600'>{errors.image?.message}</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" onClick={onCancel} className="bg-[#ff0000] hover:bg-[#cc0000] text-white flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#028c02] hover:bg-[#026b02] text-white flex-1">
                  Salvar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
