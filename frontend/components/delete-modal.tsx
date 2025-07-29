"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "./product-dashboard"

interface DeleteModalProps {
  product: Product
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteModal({ product, onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl text-[#2D1B69]">Confirmar Exclusão</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">Tem certeza que deseja excluir o produto "{product.name}"?</p>
          <div className="flex gap-4">
            <Button onClick={onConfirm} className="bg-[#5bebd4] hover:bg-[#4dd4bd] text-white flex-1 bg-[rgba(49,157,33,1)]">
              Confirmar
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="border-[#5bebd4] text-[#5bebd4] hover:bg-[#5bebd4] hover:text-white flex-1 bg-[rgba(255,8,23,1)] text-white"
            >
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
