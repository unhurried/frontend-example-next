import { useRouter } from "next/router"
import PageHeader from "../../components/PageHeader"
import Form, { TodoForm } from "../../components/Form"
import { FormikConfig } from "formik"
import { trpc } from "../../utils/trpc"

export default function FormikExample() {
    const router = useRouter()
    const todoCreate = trpc.useMutation(["todo.create"])

    const onSubmit: FormikConfig<TodoForm>['onSubmit'] = async (values) => {
        const result = await todoCreate.mutateAsync({ title: values.title, category: values.category, content: values.content })
        router.push(`/todos/${result.id}`)
    }

    return (
        <>
            <PageHeader router={router} buttons={[{ title: 'Back to List', href: '/todos' }]}>Create</PageHeader>
            <Form
                initialValues={{ title: '', category: 'one', content: '' }}
                onSubmit={onSubmit}
            />
        </>
    )
}
