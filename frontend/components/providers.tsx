"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

const queryClient = new QueryClient()

export function Providers({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    )
}