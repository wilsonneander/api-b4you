import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { isBrowser } from "@/utils/isBrowser"; // <- novo import
import api from "../lib/axios";
import * as yup from 'yup';

export interface Product {
  id: number;
  name: string;
  result: string;
  days: number;
  image: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
}

export interface ProductFormData {
  name: string
  result: string
  days: number
  categoryId: number
  image: string
}

export interface ProductResponse {
  sucess: boolean
  message: string
  data: Product[]
}

export const productSchema = yup.object({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  result: yup
    .string()
    .required("Resultado é obrigatório")
    .min(2, "Resultado deve ter pelo menos 2 caracteres")
    .max(500, "Resultado deve ter no máximo 500 caracteres"),
  days: yup
    .number()
    .required("Dias é obrigatório")
    .positive("Dias deve ser um número positivo")
    .integer("Dias deve ser um número inteiro")
    .min(1, "Dias deve ser pelo menos 1")
    .max(365, "Dias deve ser no máximo 365"),
  categoryId: yup
    .number()
    .required("ID da categoria é obrigatório")
    .positive("ID da categoria deve ser um número positivo")
    .integer("ID da categoria deve ser um número inteiro"),
  image: yup
    .string()
    .required("Imagem é obrigatória")
    .url("Imagem deve ser uma URL válida"),
});

export function useProducts() {
  return useQuery<ProductResponse>({
    queryKey: ["get-products"],
    enabled: isBrowser(),
    queryFn: async () => {
      const res = await api.get<ProductResponse>("/products");
      return res.data;
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: ProductFormData) => {
      const res = await api.post<ProductResponse>("/products", product);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number, data: ProductFormData }) => {
      const res = await api.put<ProductResponse>(`/products/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(`/products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    },
  });
}
