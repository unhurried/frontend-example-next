"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { SessionProvider } from "next-auth/react";
import { type ReactNode, useState } from "react";
import superjson from "superjson";

import { trpc } from "../utils/trpc";

const createQueryClient = () => new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient);
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url: "/api/trpc", transformer: superjson }),
      ],
    }),
  );

  return (
    <SessionProvider>
      <ChakraProvider value={defaultSystem}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
      </ChakraProvider>
    </SessionProvider>
  );
}
