"use client";

import * as React from 'react'

import { Button, TableBody, TableColumnHeader, TableHeader, TableRoot, TableRow, TableCell } from '@chakra-ui/react'
import { TodoForm } from './Form'

type Props = {
    items: TodoForm[]
    onUpdate: (id: string) => void
    onDelete: (id: string) => void
}

const List = ({ items, onUpdate, onDelete}: Props) => (
    <>
        <TableRoot native variant='striped' size='sm'>
            <TableHeader>
                <TableRow>
                    <TableColumnHeader>Category</TableColumnHeader>
                    <TableColumnHeader>Title</TableColumnHeader>
                    <TableColumnHeader>Action</TableColumnHeader>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item) =>
                    <TableRow key={item.id}>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>
                            <Button size='sm' colorScheme='blue' right='2' onClick={() => onUpdate(item.id!)}>Update</Button>
                            <Button size='sm' colorScheme='red' onClick={() => onDelete(item.id!)}>Delete</Button>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </TableRoot>
    </>
)
export default List
