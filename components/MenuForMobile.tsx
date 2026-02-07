import * as React from 'react'

import NextLink from 'next/link'
import { Menu, IconButton, Text, Box } from '@chakra-ui/react'
import { MdMenu, MdLogout } from 'react-icons/md'

type Props = {
    username: string
    links: { "text": string, "href": string }[]
    onLogout: React.MouseEventHandler<HTMLButtonElement>
}

const MenuForMobile = ({ username, links, onLogout }: Props) => (
    <Menu.Root>
        <Menu.Trigger asChild>
            <IconButton
                aria-label='Options'
                variant='outline'
            >
                <MdMenu />
            </IconButton>
        </Menu.Trigger>
        <Menu.Positioner>
            <Menu.Content color="black">
                { links.map((link, index) =>
                    <Menu.Item key={index} value={link.text} asChild>
                        <NextLink href={link.href}>
                            {link.text}
                        </NextLink>
                    </Menu.Item>
                )}
                <Menu.Separator />
                <Box px={3} py={2}>
                    <Text fontSize={14} fontWeight='normal'>Username: {username}</Text>
                </Box>
                <Menu.Item value='logout' onClick={onLogout as () => void}>
                    <MdLogout />
                    Logout
                </Menu.Item>
            </Menu.Content>
        </Menu.Positioner>
    </Menu.Root>
)
export default MenuForMobile
