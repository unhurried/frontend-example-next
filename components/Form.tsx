import { Stack } from "@chakra-ui/react"
import { Form, Formik, FormikConfig } from "formik"
import { InputControl, SelectControl, SubmitButton, TextareaControl } from "formik-chakra-ui"

interface Values {
    title: string
    category: string
    content: string
}

type Props = {
    initialValues: { title: string, category: string, content: string }
    onSubmit: FormikConfig<Values>['onSubmit']
}

const FormComponent = ({ initialValues, onSubmit }: Props) => (
    <Formik 
        initialValues={initialValues}
        onSubmit={onSubmit}>
        <Form>
            <Stack spacing={3}>
                <InputControl id="title" name="title" label="Title" />
                <SelectControl id='category' name='category' label='Category'>
                    <option value='One'>One</option>
                    <option value='Two'>Two</option>
                    <option value='Three'>Three</option>
                </SelectControl>
                <TextareaControl id="content" name='content' label='Content'></TextareaControl>
                <SubmitButton>Submit</SubmitButton>
            </Stack>
        </Form>
    </Formik>
);
export default FormComponent;
