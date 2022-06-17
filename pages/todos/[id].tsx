import { useToast } from "@chakra-ui/react"
import { FormikConfig } from "formik"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Configuration, Todo, TodoApi } from "../../client-axios"
import PageHeader from "../../components/PageHeader"
import Form from "../../components/Form"

export default function FormikExample() {
    const router = useRouter()
    const id = router.query.id as string
    const { data } = useSession({ required: true })
    const [item, setItem] = useState<Todo | null>(null)
    const toast = useToast();

    useEffect(() => {
        if (!data || !id) return;

        if (!item) {
            const api = new TodoApi(
                new Configuration({
                    basePath: process.env.NEXT_PUBLIC_TODO_API_URL,
                    accessToken: data.accessToken,
                })
            )
           
            ; (async () => {
                setItem((await api.todoControllerGet(id)).data)
            })()
        }
    }, [data, item])

    if (!data || !item) return <>Loading ...</>

    const onSubmit: FormikConfig<Todo>['onSubmit'] = async (values, actions) => {
        const api = new TodoApi(
            new Configuration({
                basePath: process.env.NEXT_PUBLIC_TODO_API_URL,
                accessToken: data.accessToken,
            })
        )
        await api.todoControllerUpdate(id, values)
        toast({ title: "Update succeeded." })
    }

    return (
        <>
            <PageHeader router={router} buttons={[{ title: 'Back to List', href: '/todos' }]}>Update</PageHeader>
            <Form
                initialValues={item}
                onSubmit={onSubmit}
            />
        </>
    )
}
