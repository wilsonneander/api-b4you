import { useMutation } from '@tanstack/react-query'
import axios from '../lib/axios'

interface LoginForm {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }: LoginForm): Promise<LoginResponse> => {
      const response = await axios.post<LoginResponse>('/auth/login', { email, password })
      return response.data
    }
  })
}
