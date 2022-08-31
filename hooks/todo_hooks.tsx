import { Configuration, TodoApi } from '../client-axios';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { useEffect, useState } from 'react';

export const useTodoList = () => {
    const todoApi = useTodoApi()
    const fetcher = async (key: string) => {
        return (await todoApi!.todoControllerGetList()).data.items
    }
    return useSWR(todoApi? 'todo_list' : null, fetcher)
}

export const useTodoApi = () => {
    const { data: session } = useSession({ required: true })
    const [api, setApi] = useState<TodoApi>()

    useEffect(() => {
        if (session) {
            const a = new TodoApi(
                new Configuration({
                    basePath: process.env.NEXT_PUBLIC_TODO_API_URL,
                    accessToken: session.accessToken,
                })
            )
            setApi(a)
        }
    }, [session])

    return api
}
