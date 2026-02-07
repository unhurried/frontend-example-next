import * as React from 'react'

import { IconButton, Menu, Text, Box } from '@chakra-ui/react'
import { MdAccountCircle, MdLogout } from 'react-icons/md'

type Props = {
    username: string
    onLogout: React.MouseEventHandler<HTMLButtonElement>
}

const LogoutControl = ({ username, onLogout }: Props) => (
    <Menu.Root>
        <Menu.Trigger asChild>
            <IconButton
                aria-label='Account'
                fontSize={40}
                rounded='full'
                variant='ghost'
            >
                <MdAccountCircle />
            </IconButton>
        </Menu.Trigger>
        <Menu.Positioner>
            <Menu.Content color="black">
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
export default LogoutControl
