import * as React from 'react'

import NextLink from 'next/link'
import { Text, Link, Flex, Heading, Stack, Spacer, Container, Wrap, Menu, MenuButton, MenuItem as MItem, IconButton, MenuList, Box, MenuGroup, MenuDivider } from '@chakra-ui/react'
import LogoutControl from './LogoutControl'
import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from '@chakra-ui/icons'
import { MdLogout } from 'react-icons/md'

const Header = () => (
    <Flex
        as="nav"
        p={4}
        bg={"gray.700"} color={"white"}
    >
        <Heading as='h1' whiteSpace='nowrap' mr='10'>Next.js ToDo App</Heading>
        <Flex w='100%' display={['none', 'none', 'flex']}>
            <Stack
                spacing={8}
                align="end" direction="row"
            >
                <MenuItem href="/todos">List</MenuItem>
                <MenuItem href="/todos/new">New Item</MenuItem>
            </Stack>
            <Spacer />
            <LogoutControl></LogoutControl>
        </Flex>
        <Flex w='100%' display={['flex', 'flex', 'none']}>
            <Spacer />
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    bgColor='grey.700'
                    icon={<HamburgerIcon />}
                    variant='outline'
                />
                <MenuList color="black">
                    <NextLink href='/todos'>
                        <MItem>List</MItem>
                    </NextLink>
                    <NextLink href='/todos/new'>
                        <MItem>New Item</MItem>
                    </NextLink>
                    <MenuDivider />
                    <MenuGroup title={`Username: dummy`} fontSize={16} fontWeight={'normal'}>
                        <MItem icon={<MdLogout />}>Logout</MItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </Flex>
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
