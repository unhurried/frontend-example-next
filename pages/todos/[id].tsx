import { Stack, useToast } from "@chakra-ui/react"
import { Formik, Form, FormikConfig } from "formik"
import { InputControl, SelectControl, SubmitButton, TextareaControl } from "formik-chakra-ui"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Configuration, Todo, TodoApi } from "../../client-axios"
import PageHeader from "../../components/PageHeader"

export default function FormikExample() {
    const router = useRouter()
    const id = router.query.id as string
    const { data } = useSession({ required: true })
    const [item, setItem] = useState<Todo | null>(null)
    const toast = useToast();

    useEffect(() => {
        if (!data || !id) return;

        if (!item) {
            const api = new TodoApi(
                new Configuration({
                    // TODO Externalize base URI for API
                    basePath: 'http://localhost:3001',
                    accessToken: data.accessToken,
                })
            )
           
            ; (async () => {
                setItem((await api.todoControllerGet(id)).data)
            })()
        }
    }, [data, item])

    if (!data || !item) return <>Loading ...</>

    const onSubmit: FormikConfig<Todo>['onSubmit'] = async (values, actions) => {
        const api = new TodoApi(
            new Configuration({
                // TODO Externalize base URI for API
                basePath: 'http://localhost:3001',
                accessToken: data.accessToken,
            })
        )
        await api.todoControllerUpdate(id, values)
        toast({ title: "Update succeeded." })
    }

    return (
        <>
            <PageHeader router={router} buttons={[{ title: 'Back to List', href: '/todos' }]}>Update</PageHeader>
            <Formik
                initialValues={item}
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
