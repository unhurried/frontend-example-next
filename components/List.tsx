import * as React from 'react'
import { Todo } from '../client-axios'

import { Table, Thead, Tbody, Tr, Th, Td, chakra, TableCaption, Tfoot, Button } from '@chakra-ui/react'

type Props = {
    items: Todo[]
    onUpdate: (id: string) => void
    onDelete: (id: string) => void
}

const List = ({ items, onUpdate, onDelete}: Props) => (
    <>
        <Table variant='striped' size='sm'>
            <Thead>
                <Tr>
                    <Th>Category</Th>
                    <Th>Title</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                {items.map((item) =>
                    <Tr key={item.id}>
                        <Td>{item.title}</Td>
                        <Td>{item.category}</Td>
                        <Td>
                            <Button size='sm' colorScheme='blue' right='2' onClick={() => onUpdate(item.id!)}>Update</Button>
                            <Button size='sm' colorScheme='red' onClick={() => onDelete(item.id!)}>Delete</Button>
                        </Td>
                    </Tr>
                )}
            </Tbody>
        </Table>
    </>
)
export default List
