import * as React from 'react'

import { Flex, Heading, Button } from '@chakra-ui/react'

type RouterLike = {
    push: (href: string) => void
}

type Props = {
    children: string
    router?: RouterLike
    buttons?: Array<{ title: string, href: string }>
}

const PageHeader = ({ children, router, buttons }: Props) => (
    <Flex justifyContent="space-between" mb={3}>
        <Heading as='h2'>{children}</Heading>
        {buttons?.map(({ title, href }, index) =>
            <Button key={index} onClick={() => { router?.push(href) }}>{title}</Button>
        )}
    </Flex>
)

export default PageHeader
