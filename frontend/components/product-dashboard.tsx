"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCarousel from "@/components/product-carousel";
import ProductForm from "@/components/product-form";
import DeleteModal from "@/components/delete-modal";
import { Plus, LogOut } from "lucide-react";
import Image from "next/image";
import Cookies from "js-cookie";
import { Product, ProductFormData, useProducts } from "@/api/use-products";
import {
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/api/use-products";

export default function ProductDashboard() {
  const { data, error, isLoading } = useProducts();
  const products = data?.data || [];
  const [showForm, setShowForm] = useState(false);
  const [formErrors, setFormErrors] = useState<string | null>();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const handleLogout = () => {
    document.body.style.opacity = "0";
    setTimeout(() => {
      Cookies.remove("token");
      window.location.reload();
    }, 300);
  };

  const handleSaveProduct = async (productData: ProductFormData) => {
    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({
          id: editingProduct.id,
          data: productData,
        });
      } else {
        await createProduct.mutateAsync(productData);
      }
      setFormErrors(null);
    } catch (error) {
      setFormErrors(error as string);
      console.log("Erro ao salvar o produto.");
    }

    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setDeleteProduct(product);
  };

  const confirmDelete = async () => {
    if (deleteProduct) {
      await deleteProductMutation.mutateAsync(deleteProduct.id);
      setDeleteProduct(null);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onSubmit={handleSaveProduct}
        onCancel={handleCloseForm}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 px-6 py-4 bg-[rgba(18,18,18,1)]">
        <div className="flex items-center justify-between">
          <Image
            src="/b4you-logo.png"
            alt="B4YOU Logo"
            width={80}
            height={40}
          />
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowForm(true)}
              className="bg-[#028c02] hover:bg-[#4dd4bd] text-white"
            >
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

      <main className="px-6 py-8">
        {formErrors && (
          <div className="text-red-600">
            Erro ao salvar o produto: {formErrors}
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2D1B69] mb-2">
            Produtos em Destaque
          </h1>
          <p className="text-gray-600">
            Gerencie seus produtos e acompanhe os resultados
          </p>
        </div>
        {isLoading && <div className="">Carregando produtos...</div>}
        {error && (
          <div className="text-red-600">
            Erro ao carregar produtos: {error.message}
          </div>
        )}

        {!isLoading && !error && <ProductCarousel
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />}
      </main>

      {deleteProduct && (
        <DeleteModal
          product={deleteProduct}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteProduct(null)}
        />
      )}
    </div>
  );
}
