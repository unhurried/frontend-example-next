'use client'

import { useCallback, useEffect, useState } from 'react'
import List from '../../components/List'
import { useRouter } from 'next/navigation'
import PageHeader from '../../components/PageHeader'
import { deleteTodo, getTodoList } from './actions'
import { TodoForm } from '../../components/Form'

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
    const onDelete = (id: string) => {
        (async () => {
            try {
                await deleteTodo(id)
                setTodoItems((items) => items?.filter((item) => item.id !== id) ?? null)
            } catch {
                setHasError(true)
            }
        })()
    }

    return (
        <>
            <PageHeader onNavigate={(href) => router.push(href)} buttons={[{ title: 'New Item', href: '/todos/new' }]}>List</PageHeader>
            <List items={todoItems} onUpdate={onUpdate} onDelete={onDelete}></List>
        </>
    )
}

export default Index
