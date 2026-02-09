'use client'

import { useCallback, useEffect, useState } from 'react'
import { createToaster } from '@chakra-ui/react'
import List from '../../components/List'
import { useRouter } from 'next/navigation'
import PageHeader from '../../components/PageHeader'
import { deleteTodo, getTodoList } from './actions'
import { TodoForm } from '../../components/Form'

const toaster = createToaster({ placement: "top" })

const Index = () => {
    const router = useRouter()
    const [todoItems, setTodoItems] = useState<TodoForm[] | null>(null)
    const [hasError, setHasError] = useState(false)

    const loadTodos = useCallback(async () => {
        try {
            const items = await getTodoList()
            setTodoItems(items)
            setHasError(false)
        } catch {
            setHasError(true)
        }
    }, [])

    useEffect(() => {
        void loadTodos()
    }, [loadTodos])

    if (hasError) return <>Something wrong happened.</>
    if (!todoItems) return <>Loading ...</>

    const onUpdate = (id: string) => {
        router.push(`/todos/${id}`)
    }
    const onDelete = async (id: string) => {
        try {
            await deleteTodo(id)
            setTodoItems((items) => (items ? items.filter((item) => item.id !== id) : null))
        } catch {
            toaster.create({ title: "Delete failed." })
        }
    }

    return (
        <>
            <PageHeader onNavigate={(href) => router.push(href)} buttons={[{ title: 'New Item', href: '/todos/new' }]}>List</PageHeader>
            <List items={todoItems} onUpdate={onUpdate} onDelete={onDelete}></List>
        </>
    )
}

export default Index
