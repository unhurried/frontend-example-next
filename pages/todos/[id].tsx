import { useToast } from "@chakra-ui/react"
import { FormikConfig } from "formik"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Todo } from "../../client-axios"
import PageHeader from "../../components/PageHeader"
import Form from "../../components/Form"
import { useTodoApi } from "../../hooks/todo_hooks"

export default function FormikExample() {
    const router = useRouter()
    const id = router.query.id as string
    const todoApi = useTodoApi()
    const [item, setItem] = useState<Todo | null>(null)
    const toast = useToast();

    useEffect(() => {
        if (!todoApi) return;

        if (!item) {
            (async () => {
                setItem((await todoApi.todoControllerGet(id)).data)
            })()
        }
    }, [id, item, todoApi])

    if (!item) return <>Loading ...</>

    const onSubmit: FormikConfig<Todo>['onSubmit'] = async (values, actions) => {
        await todoApi?.todoControllerUpdate(id, values)
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
