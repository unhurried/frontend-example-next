"use client";

import * as React from 'react'

import {
    IconButton,
    MenuContent,
    MenuItem,
    MenuItemGroup,
    MenuItemGroupLabel,
    MenuPositioner,
    MenuRoot,
    MenuTrigger,
} from '@chakra-ui/react'
import { MdAccountCircle, MdLogout } from 'react-icons/md'

type Props = {
    username: string
    onLogout: React.MouseEventHandler<HTMLElement>
}

const LogoutControl = ({ username, onLogout }: Props) => (
    <MenuRoot>
        <MenuTrigger asChild>
            <IconButton
                aria-label='Account'
                fontSize={40}
                icon={<MdAccountCircle />}
                isRound={true}
                variant='unstyled'
            />
        </MenuTrigger>
        <MenuPositioner>
            <MenuContent color="black">
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
export default LogoutControl
