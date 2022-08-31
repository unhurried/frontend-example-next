import { useRouter } from "next/router"
import { Todo, TodoCategoryEnum } from "../../client-axios"
import PageHeader from "../../components/PageHeader"
import Form from "../../components/Form"
import { FormikConfig } from "formik"
import { useTodoApi } from "../../hooks/todo_hooks"

export default function FormikExample() {
    const router = useRouter()
    const todoApi = useTodoApi()
    if (!todoApi) return <>loading</>

    const onSubmit: FormikConfig<Todo>['onSubmit'] = async (values, actions) => {
        const id = (await todoApi.todoControllerPost(values)).data.id
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
