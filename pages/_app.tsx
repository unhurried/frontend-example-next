import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import DefaultLayout from '../components/DefaultLayout'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

import superjson from "superjson";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/trpc/router/_app";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  session: Session
}

function MyApp({ session, Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{ page }</DefaultLayout>)

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        { getLayout(<Component {...pageProps} />) }
      </ChakraProvider>
    </SessionProvider>
  )
}

// Add tRPC feature to Next App.
// @link https://github.com/t3-oss/create-t3-app/blob/create-t3-app%405.15.0/cli/template/page-studs/_app/with-auth-trpc.tsx
export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = '/api/trpc';

    return {
      // Links are used to customize the flow of data between tRPC client and server.
      // @link https://trpc.io/docs/v9/links
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
    };
  },
  // Refer to the doc for the procedure to enable SSR.
  // @link https://trpc.io/docs/ssr
  ssr: false,
})(MyApp);
