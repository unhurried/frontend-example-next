import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import DefaultLayout from '../components/DefaultLayout'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

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

export default MyApp
