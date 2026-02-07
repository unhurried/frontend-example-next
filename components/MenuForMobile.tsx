"use client";

import * as React from 'react'

import NextLink from 'next/link'
import {
    IconButton,
    MenuContent,
    MenuItem,
    MenuItemGroup,
    MenuItemGroupLabel,
    MenuPositioner,
    MenuRoot,
    MenuSeparator,
    MenuTrigger,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { MdLogout } from 'react-icons/md'

type Props = {
    username: string
    links: { "text": string, "href": string }[]
    onLogout: React.MouseEventHandler<HTMLElement>
}

const MenuForMobile = ({ username, links, onLogout }: Props) => (
    <MenuRoot>
        <MenuTrigger asChild>
            <IconButton
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
            />
        </MenuTrigger>
        <MenuPositioner>
            <MenuContent color="black">
                {links.map((link, index) => (
                    <MenuItem key={index} asChild>
                        <NextLink href={link.href}>{link.text}</NextLink>
                    </MenuItem>
                ))}
                <MenuSeparator />
                <MenuItemGroup>
                    <MenuItemGroupLabel fontSize={16} fontWeight={'normal'}>
                        {`Username: ${username}`}
                    </MenuItemGroupLabel>
                    <MenuItem onClick={onLogout}>
                        <MdLogout />
                        Logout
                    </MenuItem>
                </MenuItemGroup>
            </MenuContent>
        </MenuPositioner>
    </MenuRoot>
)
export default MenuForMobile
