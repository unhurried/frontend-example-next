'use client'

import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import PageHeader from "../../../components/PageHeader"
import Form, { TodoForm } from "../../../components/Form"
import { FormikConfig } from "formik"
import { trpc } from "../../../utils/trpc"
import { createToaster } from "@chakra-ui/react"

const toaster = createToaster({ placement: "top" })

export default function EditTodo() {
    const router = useRouter()
    const params = useParams()
    const id = params?.id as string
    const todoQuery = trpc.todo.get.useQuery(id)
    const todoMutation = trpc.todo.update.useMutation()

    if (!todoQuery.data) return <>Loading ...</>

    const initialValues = {
        id: todoQuery.data.id,
        title: todoQuery.data.title,
        category: todoQuery.data.category,
        content: todoQuery.data.content ? todoQuery.data.content : "",
    }

    const onSubmit: FormikConfig<TodoForm>['onSubmit'] = async (values, actions) => {
        await todoMutation.mutateAsync({
            id,
            title: values.title,
            category: values.category,
            content: values.content,
        })
        todoQuery.refetch()
        toaster.create({ title: "Update succeeded." })
    }

    return (
        <>
            <PageHeader onNavigate={(href) => router.push(href)} buttons={[{ title: 'Back to List', href: '/todos' }]}>Update</PageHeader>
            <Form
                initialValues={initialValues}
                onSubmit={onSubmit}
            />
        </>
    )
}
