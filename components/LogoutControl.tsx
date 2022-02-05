import * as React from 'react'

import { IconButton, Menu, MenuButton, MenuItem, MenuList, MenuGroup } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { MdAccountCircle, MdLogout } from 'react-icons/md'

const LogoutControl = () => {
    const { data } = useSession({ required: true })
    const onSignOut = async () => {
        const url = new URL("http://localhost:3002/session/end")
        url.searchParams.append("id_token_hint", data!.idToken)
        url.searchParams.append("post_logout_redirect_uri", "http://localhost:3000")
        signOut({ callbackUrl: url.toString() })
    }

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
                <MenuGroup title={`Username: ${data?.sub}`} fontSize={16} fontWeight={'normal'}>
                    <MenuItem icon={<MdLogout />} onClick={onSignOut}>Logout</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    </>
}
export default LogoutControl
