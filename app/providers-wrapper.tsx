'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import TRPCProvider from './providers'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TRPCProvider>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </TRPCProvider>
    </SessionProvider>
  )
}
