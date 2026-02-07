import * as React from 'react'

import { Flex, Heading, Button } from '@chakra-ui/react'

type Props = {
    children: string
    onNavigate?: (href: string) => void
    buttons?: Array<{ title: string, href: string }>
}

const PageHeader = ({ children, onNavigate, buttons }: Props) => (
    <Flex justifyContent="space-between" mb={3}>
        <Heading as='h2'>{children}</Heading>
        {buttons?.map(({ title, href }, index) =>
            <Button key={index} onClick={() => { onNavigate?.(href) }}>{title}</Button>
        )}
    </Flex>
)

export default PageHeader
