import * as React from 'react'

import { Table, Button } from '@chakra-ui/react'
import { TodoForm } from './Form'

type Props = {
    items: TodoForm[]
    onUpdate: (id: string) => void
    onDelete: (id: string) => void
}

const List = ({ items, onUpdate, onDelete}: Props) => (
    <>
        <Table.Root variant='outline' size='sm'>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Category</Table.ColumnHeader>
                    <Table.ColumnHeader>Title</Table.ColumnHeader>
                    <Table.ColumnHeader>Action</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items.map((item) =>
                    <Table.Row key={item.id}>
                        <Table.Cell>{item.category}</Table.Cell>
                        <Table.Cell>{item.title}</Table.Cell>
                        <Table.Cell>
                            <Button size='sm' colorPalette='blue' mr='2' onClick={() => onUpdate(item.id!)}>Update</Button>
                            <Button size='sm' colorPalette='red' onClick={() => onDelete(item.id!)}>Delete</Button>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table.Root>
    </>
)
export default List
