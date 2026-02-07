import { Stack, Input, Textarea, Button } from "@chakra-ui/react"
import { Field } from "@chakra-ui/react"
import { NativeSelect } from "@chakra-ui/react"
import { Form, Formik, FormikConfig } from "formik"

export type TodoForm = {
    id?: string
    title: string
    category: string
    content: string
}

type Props = {
    initialValues: TodoForm
    onSubmit: FormikConfig<TodoForm>['onSubmit']
}

const FormComponent = ({ initialValues, onSubmit }: Props) => (
    <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({ handleChange, handleBlur, values, isSubmitting }) => (
            <Form>
                <Stack gap={3}>
                    <Field.Root>
                        <Field.Label htmlFor="title">Title</Field.Label>
                        <Input
                            id="title"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Field.Root>
                    <Field.Root>
                        <Field.Label htmlFor="category">Category</Field.Label>
                        <NativeSelect.Root>
                            <NativeSelect.Field
                                id="category"
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value='one'>One</option>
                                <option value='two'>Two</option>
                                <option value='three'>Three</option>
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                        </NativeSelect.Root>
                    </Field.Root>
                    <Field.Root>
                        <Field.Label htmlFor="content">Content</Field.Label>
                        <Textarea
                            id="content"
                            name="content"
                            value={values.content}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Field.Root>
                    <Button type="submit" loading={isSubmitting}>Submit</Button>
                </Stack>
            </Form>
        )}
    </Formik>
);
export default FormComponent;
