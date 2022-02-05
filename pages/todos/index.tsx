import { Configuration, Todo, TodoApi } from '../../client-axios';
import List from '../../components/List';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageHeader from '../../components/PageHeader';

const Index = () => {
    const router = useRouter()
    const { data } = useSession({ required: true })
    const [items, setItems] = useState<Todo[] | null>(null)

    useEffect(() => {
        if (!data) return;

        if (!items) {
            const api = new TodoApi(
                new Configuration({
                    // TODO Externalize base URI for API
                    basePath: 'http://localhost:3001',
                    accessToken: data.accessToken,
                })
            )
                ; (async () => {
                    setItems((await api.todoControllerGetList()).data.items)
                })()
        }
    }, [data, items])

    const onUpdate = (id: string) => {
        router.push(`/todos/${id}`)
    }
    const onDelete = (id: string) => {
        const api = new TodoApi(
            new Configuration({
                // TODO Externalize base URI for API
                basePath: 'http://localhost:3001',
                accessToken: data.accessToken,
            })
        )
        ;(async () => {
            await api.todoControllerDelete(id)
            fetchList();
        })()
    }
    const fetchList = () => {
        const api = new TodoApi(
            new Configuration({
                // TODO Externalize base URI for API
                basePath: 'http://localhost:3001',
                accessToken: data.accessToken,
            })
        )
        ;(async () => {
            setItems((await api.todoControllerGetList()).data.items)
        })()
    }

    if (!data || !items) return <>Loading ...</>

    return (
        <>
            <PageHeader router={router} buttons={[{ title: 'New Item', href: '/todos/new' }]}>List</PageHeader>
            <List items={items} onUpdate={onUpdate} onDelete={onDelete}></List>
        </>
    )
}

export default Index
