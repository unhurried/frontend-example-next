import { Stack } from "@chakra-ui/react"
import { Formik, Form, FormikConfig } from "formik"
import { InputControl, SelectControl, SubmitButton, TextareaControl } from "formik-chakra-ui"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { Configuration, TodoApi, TodoCategoryEnum } from "../../client-axios"
import PageHeader from "../../components/PageHeader"

interface Values {
    title: string
    category: TodoCategoryEnum
    content: string
}

export default function FormikExample() {
    const router = useRouter()
    const { data } = useSession({ required: true })
    if (!data) return <>loading</>

    const onSubmit: FormikConfig<Values>['onSubmit'] = async (values, actions) => {
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
            <Formik
                initialValues={{ title: '', category: TodoCategoryEnum.One, content: '' }}
                onSubmit={onSubmit}
            >
                <Form>
                    <Stack spacing={3}>
                        <InputControl id="title" name="title" label="Title" />
                        <SelectControl id='category' name='category' label='Category'>
                            <option value='one'>One</option>
                            <option value='two'>Two</option>
                            <option value='three'>Three</option>
                        </SelectControl>
                        <TextareaControl id="content" name='content' label='Content'></TextareaControl>
                        <SubmitButton>Submit</SubmitButton>
                    </Stack>
                </Form>
            </Formik>
        </>
    )
}
