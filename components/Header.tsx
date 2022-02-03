import * as React from 'react'

import NextLink from 'next/link'
import { Text, Link, Flex, Heading, Stack, Spacer } from '@chakra-ui/react'
import LogoutControl from './LogoutControl'

const Header = () => (
    <Flex
        as="nav"
        p={4}
        bg={"gray.700"} color={"white"}
    >
        <Stack
            spacing={8}
            align="end" direction="row"
        >
            <Heading as='h1'>Next.js ToDo App</Heading>
            <MenuItem href="/todos">List</MenuItem>
            <MenuItem href="/todos/new">New Item</MenuItem>
        </Stack>
        <Spacer />
        <LogoutControl></LogoutControl>
    </Flex>
)
export default Header

const MenuItem = ({ href = "/", children }: { href: string, children: React.ReactNode }) => {
    return (
        <NextLink href={href} passHref>
            <Link>
                <Text display="block">
                    {children}
                </Text>
            </Link>
        </NextLink>
    )
}
