"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProductCarousel from "@/components/product-carousel"
import ProductForm from "@/components/product-form"
import DeleteModal from "@/components/delete-modal"
import { Plus, LogOut } from "lucide-react"
import Image from "next/image"
import Cookies from "js-cookie"

export interface Product {
  id: string
  name: string
  result: string
  days: number
  category: string
  image: string
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "LipeLift",
    result: "100 mil reais em 30 dias",
    days: 30,
    category: "Suplementação Feminina",
    image: "/products/Lipefit.webp",
  },
  {
    id: "2",
    name: "Dreams Coffe",
    result: "10 milhões de Faturados em 2024",
    days: 7,
    category: "Suplementos e Vitaminas",
    image: "/products/Dreams.coffee.jpg",
  },
  {
    id: "3",
    name: "Blessy",
    result: "386 mil reais em 30 dias",
    days: 30,
    category: "Suplementação Feminina",
    image: "/products/Blessy.jpeg",
  },
  {
    id: "4",
    name: "Lucence",
    result: "1,4 milhão em 65 dias",
    days: 65,
    category: "Cosméticos",
    image: "/products/Lucence.avif",
  },
  {
    id: "5",
    name: "Saviora",
    result: "600 mil reais em 90 dias",
    days: 90,
    category: "Cosméticos",
    image: "/products/Saviora.avif",
  },
  {
    id: "6",
    name: "Bigboom",
    result: "5 milhões faturados",
    days: 90,
    category: "Suplementação Femenina",
    image: "/products/Bigboom.avif",
  },
]

export default function ProductDashboard() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null)

  const handleLogout = () => {
    // Adicionar fade-out antes de fazer logout
    document.body.style.opacity = "0"
    setTimeout(() => {
      Cookies.remove("token")
      window.location.reload()
    }, 300)
  }

  const handleSaveProduct = (productData: Omit<Product, "id">) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p)))
    } else {
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
      }
      setProducts([...products, newProduct])
    }
    setShowForm(false)
    setEditingProduct(null)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDeleteProduct = (product: Product) => {
    setDeleteProduct(product)
  }

  const confirmDelete = () => {
    if (deleteProduct) {
      setProducts(products.filter((p) => p.id !== deleteProduct.id))
      setDeleteProduct(null)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  if (showForm) {
    return <ProductForm product={editingProduct} onSave={handleSaveProduct} onCancel={handleCloseForm} />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-6 py-4 bg-[rgba(18,18,18,1)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/b4you-logo.png" alt="B4YOU Logo" width={80} height={40} />
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={() => setShowForm(true)} className="bg-[#028c02] hover:bg-[#4dd4bd] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-[#5bebd4] text-[#5bebd4] hover:bg-[#FF0000] hover:text-white bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D1B69] mb-2">Produtos em Destaque</h1>
          <p className="text-gray-600">Gerencie seus produtos e acompanhe os resultados</p>
        </div>

        <ProductCarousel products={products} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
      </main>

      {/* Delete Modal */}
      {deleteProduct && (
        <DeleteModal product={deleteProduct} onConfirm={confirmDelete} onCancel={() => setDeleteProduct(null)} />
      )}
    </div>
  )
}
