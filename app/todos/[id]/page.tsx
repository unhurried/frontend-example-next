'use client'

import { useCallback, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import PageHeader from "../../../components/PageHeader"
import Form, { TodoForm } from "../../../components/Form"
import { FormikConfig } from "formik"
import { createToaster } from "@chakra-ui/react"

import { getTodo, updateTodo, type TodoItem } from "../actions"

const toaster = createToaster({ placement: "top" })

export default function EditTodo() {
    const router = useRouter()
    const params = useParams()
    const id = params && typeof params.id === "string" ? params.id : undefined
    const [todo, setTodo] = useState<TodoItem | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const loadTodo = useCallback(async () => {
        if (!id) return
        setIsLoading(true)
        try {
            const data = await getTodo(id)
            setTodo(data)
            setHasError(false)
        } catch {
            setHasError(true)
        } finally {
            setIsLoading(false)
        }
    }, [id])

    useEffect(() => {
        void loadTodo()
    }, [loadTodo])

    if (hasError) return <>Something wrong happened.</>
    if (isLoading) return <>Loading ...</>
    if (!todo) return <>Not found.</>

    const initialValues = {
        id: todo.id,
        title: todo.title,
        category: todo.category,
        content: todo.content,
    }

    const onSubmit: FormikConfig<TodoForm>['onSubmit'] = async (values) => {
        if (!id) return
        try {
            const updated = await updateTodo({
                id,
                title: values.title,
                category: values.category,
                content: values.content,
            })
            if (!updated) {
                toaster.create({ title: "Update failed." })
                return
            }
            setTodo(updated)
            toaster.create({ title: "Update succeeded." })
        } catch {
            toaster.create({ title: "Update failed." })
        }
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
