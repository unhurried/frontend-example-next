import * as React from 'react'

import NextLink from 'next/link'
import { Menu, MenuButton, MenuItem, IconButton, MenuList, MenuGroup, MenuDivider } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { MdLogout } from 'react-icons/md'

type Props = {
    username: string
    links: { "text": string, "href": string }[]
    onLogout: React.MouseEventHandler<HTMLButtonElement>
}

const MenuForMobile = ({ username, links, onLogout }: Props) => (
    <Menu>
        <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
        />
        <MenuList color="black">
            { links.map((link, index) =>
                <NextLink key={index} href={link.href}>
                    <MenuItem>{link.text}</MenuItem>
                </NextLink>
            )}
            <MenuDivider />
            <MenuGroup title={`Username: ${username}`} fontSize={16} fontWeight={'normal'}>
                <MenuItem icon={<MdLogout />} onClick={onLogout}>Logout</MenuItem>
            </MenuGroup>
        </MenuList>
    </Menu>
)
export default MenuForMobile
