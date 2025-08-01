"use client"
import * as yup from 'yup';
import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useLogin } from '@/api/use-login';
import Cookies from 'js-cookie';


interface LoginPageProps {
  onLoginSuccess?: () => void
}

interface LoginForm {
  email: string
  password: string
}

export const loginSchema = yup.object({
    email: yup
      .string()
      .required('Email é obrigatório')
      .email('Email deve ser um email válido'),
    password: yup
      .string()
      .required('Senha é obrigatória')
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
}); 

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema)
  })
const {mutateAsync, error, isPending} = useLogin()
const onSubmit: SubmitHandler<LoginForm> = async (data) => {
  try {
    const response = await mutateAsync(data)
    const token = response?.token

    if (token) {
      Cookies.set('token', token, { expires: 1 })
      console.log('Token salvo:', token)

      onLoginSuccess?.()
    }
  } catch (error) {
    console.error('Erro no login:', error)
  }
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#2D1B69]">
                Email
              </Label>
              <Input
                id="email"
                {...register("email", { required: true })}
                className="border-gray-300 focus:border-[#5bebd4] focus:ring-[#5bebd4]"
                placeholder="seu@email.com"
              />
              <p className='text-red-600'>{errors.email?.message}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#2D1B69]">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: true })}
                required
                className="border-gray-300 focus:border-[#5bebd4] focus:ring-[#5bebd4]"
                placeholder="••••••••"
              />
              <p className="text-red-600">{errors.password?.message}</p>
            </div>
            <p className="text-red-600">{(error as any)?.response?.data?.message}</p>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#5bebd4] hover:bg-[#4dd4bd] text-white font-medium transition-all duration-200 bg-[rgba(32,180,145,1)]"
            >
              {isPending ? (
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
