'use client'

import * as React from 'react'

import NextLink from 'next/link'
import { Text, Link, Flex, Heading, Stack, Spacer } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import LogoutControl from './LogoutControl'
import MenuForMobile from './MenuForMobile'
import MenuForDesktop from './MenuForDesktop'

const Header = () => {
    const { data } = useSession({ required: true })

    const username = data ? data.sub : "Loading ..."
    const links = [{ text: "List", href: "/todos" }, { text: "New Item", href: "/todos/new" }]
    const onLogout = async () => {
        console.log(process.env.OIDC_END_SESSION_EP)
        const url = new URL(process.env.NEXT_PUBLIC_OIDC_END_SESSION_EP!)
        url.searchParams.append("id_token_hint", data!.idToken)
        url.searchParams.append("post_logout_redirect_uri", "http://localhost:3000")
        signOut({ callbackUrl: url.toString() })
    }

    return (
        <Flex
            as="nav"
            p={4}
            bg={"gray.700"} color={"white"}
        >
            <Heading as='h1' whiteSpace='nowrap' mr='10'>Next.js ToDo App</Heading>
            <Flex w='100%' display={['none', 'none', 'flex']}>
                <MenuForDesktop links={links}></MenuForDesktop>
               <Spacer />
                <LogoutControl
                    username={data ? data.sub : "Loading ..."}
                    onLogout={onLogout}
                ></LogoutControl>
            </Flex>
            <Flex w='100%' display={['flex', 'flex', 'none']}>
                <Spacer />
                <MenuForMobile
                    username={data ? data.sub : "Loading ..."}
                    links={[{ text: "List", href: "/todos" }, { text: "New Item", href: "/todos/new" }]}
                    onLogout={onLogout}
                ></MenuForMobile>
            </Flex>
        </Flex>
    )
}
export default Header
