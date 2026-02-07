"use client";

import { Button, FieldLabel, FieldRoot, Input, Select, Stack, Textarea } from "@chakra-ui/react"
import { Field, Form, Formik, FormikConfig, type FieldInputProps } from "formik"

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
        <Form>
            <Stack gap={3}>
                <Field name="title">
                    {({ field }: { field: FieldInputProps<string> }) => (
                        <FieldRoot>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input {...field} id="title" />
                        </FieldRoot>
                    )}
                </Field>
                <Field name="category">
                    {({ field }: { field: FieldInputProps<string> }) => (
                        <FieldRoot>
                            <FieldLabel htmlFor="category">Category</FieldLabel>
                            <Select {...field} id="category">
                                <option value='one'>One</option>
                                <option value='two'>Two</option>
                                <option value='three'>Three</option>
                            </Select>
                        </FieldRoot>
                    )}
                </Field>
                <Field name="content">
                    {({ field }: { field: FieldInputProps<string> }) => (
                        <FieldRoot>
                            <FieldLabel htmlFor="content">Content</FieldLabel>
                            <Textarea {...field} id="content" />
                        </FieldRoot>
                    )}
                </Field>
                <Button type="submit">Submit</Button>
            </Stack>
        </Form>
    </Formik>
);
export default FormComponent;
