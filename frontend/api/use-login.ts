import { useMutation } from '@tanstack/react-query';
import axios from '../lib/axios';

interface LoginForm {
    email: string
    password: string
  }
  

export function useLogin(){
    return useMutation({
        mutationFn:({email, password}: LoginForm) => {
           return axios.post("/auth/login", {email, password})  
        }
    })
}
