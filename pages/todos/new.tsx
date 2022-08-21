import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { Configuration, Todo, TodoApi, TodoCategoryEnum } from "../../client-axios"
import PageHeader from "../../components/PageHeader"
import Form from "../../components/Form"
import { FormikConfig } from "formik"

export default function FormikExample() {
    const router = useRouter()
    const { data } = useSession({ required: true })
    if (!data) return <>loading</>

    const onSubmit: FormikConfig<Todo>['onSubmit'] = async (values, actions) => {
        const api = new TodoApi(
            new Configuration({
                basePath: process.env.NEXT_PUBLIC_TODO_API_URL,
                accessToken: data.accessToken,
            })
        )
        const id = await (await api.todoControllerPost(values)).data.id
        router.push(`/todos/${id}`)
    }

    return (
        <>
            <PageHeader router={router} buttons={[{ title: 'Back to List', href: '/todos' }]}>Create</PageHeader>
            <Form
                initialValues={{ title: '', category: TodoCategoryEnum.One, content: '' }}
                onSubmit={onSubmit}
            />
        </>
    )
}
