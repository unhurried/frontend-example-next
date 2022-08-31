import List from '../../components/List';
import { useRouter } from 'next/router';
import PageHeader from '../../components/PageHeader';
import { useSWRConfig } from 'swr';
import { useTodoApi, useTodoList } from '../../hooks/todo_hooks';

const Index = () => {
    const router = useRouter()
    const { data: todoItems, error } = useTodoList()
    const todoApi = useTodoApi()
    const { mutate } = useSWRConfig()

    if (error) return <>Something wrong happend.</>
    if (!todoApi || !todoItems) return <>Loading ...</>

    const onUpdate = (id: string) => {
        router.push(`/todos/${id}`)
    }
    const onDelete = (id: string) => {
        (async () => {
            await todoApi.todoControllerDelete(id)
            mutate('todo_list')
        })()
    }

    return (
        <>
            <PageHeader router={router} buttons={[{ title: 'New Item', href: '/todos/new' }]}>List</PageHeader>
            <List items={todoItems!} onUpdate={onUpdate} onDelete={onDelete}></List>
        </>
    )
}

export default Index
