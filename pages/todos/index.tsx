import List from '../../components/List';
import { useRouter } from 'next/router';
import PageHeader from '../../components/PageHeader';
import { trpc } from '../../utils/trpc';
import { TodoForm } from '../../components/Form';
import type { Todo } from '@prisma/client';

const Index = () => {
    const router = useRouter()
    const todoQuery = trpc.todo.getList.useQuery()
    const todoMutation = trpc.todo.delete.useMutation()

    if (todoQuery.isError) return <>Something wrong happend.</>
    if (!todoQuery.data) return <>Loading ...</>

    const todoItems: TodoForm[] = todoQuery.data.map<TodoForm>((item: Todo) => {
        return {
            id: item.id,
            title: item.title,
            category: item.category,
            content: item.content ? item.content : ""
        }
    })

    const onUpdate = (id: string) => {
        router.push(`/todos/${id}`)
    }
    const onDelete = (id: string) => {
        (async () => {
            await todoMutation.mutateAsync(id)
            todoQuery.refetch()
        })()
    }

    return (
        <>
            <PageHeader router={router} buttons={[{ title: 'New Item', href: '/todos/new' }]}>List</PageHeader>
            <List items={todoItems} onUpdate={onUpdate} onDelete={onDelete}></List>
        </>
    )
}

export default Index
