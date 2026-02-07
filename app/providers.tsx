'use client'

import { useState } from 'react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc, getTRPCClientOptions } from '../utils/trpc'

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() => trpc.createClient(getTRPCClientOptions()))

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <SessionProvider>
                    <ChakraProvider value={defaultSystem}>
                        {children}
                    </ChakraProvider>
                </SessionProvider>
            </QueryClientProvider>
        </trpc.Provider>
    )
}
