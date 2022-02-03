import * as React from 'react'

import { IconButton, Menu, MenuButton, MenuItem, MenuList, MenuGroup } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { MdAccountCircle, MdLogout } from 'react-icons/md'

const LogoutControl = () => {
    const { data } = useSession({ required: true })
    return <>
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
                <MenuGroup title={`Username: ${data?.user.id}`} fontSize={16} fontWeight={'normal'}>
                    <MenuItem icon={<MdLogout />} onClick={() => signOut()}>Logout</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    </>
}
export default LogoutControl
