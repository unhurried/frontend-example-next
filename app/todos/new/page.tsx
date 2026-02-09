'use client'

import { useRouter } from "next/navigation"
import PageHeader from "../../../components/PageHeader"
import Form, { TodoForm } from "../../../components/Form"
import { FormikConfig } from "formik"

import { createTodo } from "../actions"

export default function CreateTodo() {
    const router = useRouter()

    const onSubmit: FormikConfig<TodoForm>['onSubmit'] = async (values) => {
        const result = await createTodo({ title: values.title, category: values.category, content: values.content })
        router.push(`/todos/${result.id}`)
    }

    return (
        <>
            <PageHeader onNavigate={(href) => router.push(href)} buttons={[{ title: 'Back to List', href: '/todos' }]}>Create</PageHeader>
            <Form
                initialValues={{ title: '', category: 'one', content: '' }}
                onSubmit={onSubmit}
            />
        </>
    )
}
