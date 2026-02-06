'use client'

import { useToast } from "@chakra-ui/react"
import { FormikConfig } from "formik"
import { useRouter, useParams } from "next/navigation"
import PageHeader from "../../../components/PageHeader"
import Form, { TodoForm } from "../../../components/Form"
import { trpc } from "../../trpc"

export default function TodoDetailPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string
    const todoQuery = trpc.todo.get.useQuery(id)
    const todoMutation = trpc.todo.update.useMutation()
    const toast = useToast()

    if (!todoQuery.data) return <>Loading ...</>

    const initialValues = {
        id: todoQuery.data.id,
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
