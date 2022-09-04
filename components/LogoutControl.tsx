import * as React from 'react'

import { IconButton, Menu, MenuButton, MenuItem, MenuList, MenuGroup } from '@chakra-ui/react'
import { MdAccountCircle, MdLogout } from 'react-icons/md'

type Props = {
    username: string
    onLogout: React.MouseEventHandler<HTMLButtonElement>
}

const LogoutControl = ({ username, onLogout }: Props) => (
    <Menu>
        <MenuButton
            as={IconButton}
            aria-label='Account'
            fontSize={40}
            icon={<MdAccountCircle />}
            isRound={true}
            variant='unstyled'
        />
        <MenuList color="black">
            <MenuGroup title={`Username: ${username}`} fontSize={16} fontWeight={'normal'}>
                <MenuItem icon={<MdLogout />} onClick={onLogout}>Logout</MenuItem>
            </MenuGroup>
        </MenuList>
    </Menu>
)
export default LogoutControl
