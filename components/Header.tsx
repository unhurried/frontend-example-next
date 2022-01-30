import * as React from 'react'

import NextLink from 'next/link'
import { Text, Link, Flex, Heading, Stack } from '@chakra-ui/react'

const Header = () => (
    <Stack
        as="nav"
        p={4} spacing={8}
        align="end" direction="row"
        bg={"gray.700"} color={"white"}
    >

        <Heading as='h1'>Next.js ToDo App</Heading>
        <MenuItem href="/todos">List</MenuItem>
        <MenuItem href="/todos/new">New Item</MenuItem>
    </Stack>
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
