"use client"
import { Product } from "@/api/use-products"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import Image from "next/image"

interface ProductCarouselProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export default function ProductCarousel({ products, onEdit, onDelete }: ProductCarouselProps) {
  return (
    <div className="relative bg-white">
      {Array.isArray(products) && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => {
            const isWhiteCard = index % 2 === 0
            const bgColor = isWhiteCard ? "bg-white" : "bg-[#5bebd4]"
            const textColor = "text-black"
            const categoryBg = "bg-[#2D1B69]"
            const categoryText = "text-white"

            return (
              <div
                key={product.id}
                className={`border border-gray-200 rounded-2xl overflow-hidden relative group shadow-lg`}
              >
                {/* Ações */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onEdit(product)}
                    className="bg-[#028c02] hover:bg-[#026b02] text-white rounded-full w-8 h-8 p-0"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onDelete(product)}
                    className="bg-[#ff0000] hover:bg-[#cc0000] text-white rounded-full w-8 h-8 p-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Imagem */}
                <div className="h-48 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Conteúdo */}
                <div className={`${bgColor} p-4 space-y-3`}>
                  <h3 className={`text-xl font-bold ${textColor}`}>{product.name}</h3>
                  <p className={`text-sm ${textColor} leading-relaxed`}>{product.result}</p>
                  <div className="pt-2">
                    <span
                      className={`${categoryBg} ${categoryText} px-4 py-2 rounded-full text-sm font-medium inline-block`}
                    >
                      {product.category.name}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic py-10">Nenhum produto encontrado.</p>
      )}
    </div>
  )
}
