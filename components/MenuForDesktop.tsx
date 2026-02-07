import * as React from 'react'

import NextLink from 'next/link'
import { Stack, Text } from '@chakra-ui/react'

type Props = {
    links: { "text": string, "href": string }[],
}

const MenuForDesktop = ({ links }: Props) => (
    <Stack
        gap={8}
        align="end" direction="row"
    >
        {links.map((link, index) =>
            <NextLink key={index} href={link.href}>
                <Text display="block">
                    {link.text}
                </Text>
            </NextLink>
        )}
    </Stack>

)
export default MenuForDesktop
