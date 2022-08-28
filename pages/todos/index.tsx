import { Configuration, TodoApi } from '../../client-axios';
import List from '../../components/List';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import PageHeader from '../../components/PageHeader';
import userSWR, { useSWRConfig } from 'swr';

const Index = () => {
    const router = useRouter()
    const { data: sessionData } = useSession({ required: true })

    const fetcher = async () => {
        const api = new TodoApi(
            new Configuration({
                basePath: process.env.NEXT_PUBLIC_TODO_API_URL,
                accessToken: sessionData?.accessToken,
            })
        )
        return (await api.todoControllerGetList()).data.items
    }
    const { data: todoItems, error } = userSWR(sessionData? 'todo_list' : null, fetcher)
    const { mutate } = useSWRConfig()

    const onUpdate = (id: string) => {
        router.push(`/todos/${id}`)
    }
    const onDelete = (id: string) => {
        const api = new TodoApi(
            new Configuration({
                basePath: process.env.NEXT_PUBLIC_TODO_API_URL,
                accessToken: sessionData!.accessToken,
            })
        )
        ;(async () => {
            await api.todoControllerDelete(id)
            mutate('todo_list')
        })()
    }

    if (error) return <>Something wrong happend.</>
    if (!todoItems) return <>Loading ...</>
    return (
        <>
            <PageHeader router={router} buttons={[{ title: 'New Item', href: '/todos/new' }]}>List</PageHeader>
            <List items={todoItems!} onUpdate={onUpdate} onDelete={onDelete}></List>
        </>
    )
}

export default Index
