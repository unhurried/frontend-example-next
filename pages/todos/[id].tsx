import { useToast } from "@chakra-ui/react"
import { FormikConfig } from "formik"
import { useRouter } from "next/router"
import PageHeader from "../../components/PageHeader"
import Form, { TodoForm } from "../../components/Form"
import { trpc } from "../../utils/trpc"

export default function FormikExample() {
    const router = useRouter()
    const id = router.query.id as string
    const todoQuery = trpc.useQuery(["todo.get", id])
    const todoMutation = trpc.useMutation(["todo.update"])
    const toast = useToast()

    if (!todoQuery.data) return <>Loading ...</>

    const initialValues = {
        title: todoQuery.data.title,
        category: todoQuery.data.category,
        content: todoQuery.data.content? todoQuery.data.content : "",
    }

    const onSubmit: FormikConfig<TodoForm>['onSubmit'] = async (values, actions) => {
        await todoMutation.mutateAsync({
            id,
            title: values.title,
            category: values.category,
            content: values.content,
        })
        todoQuery.refetch()
        toast({ title: "Update succeeded." })
    }

    return (
        <>
            <PageHeader router={router} buttons={[{ title: 'Back to List', href: '/todos' }]}>Update</PageHeader>
            <Form
                initialValues={initialValues}
                onSubmit={onSubmit}
            />
        </>
    )
}
