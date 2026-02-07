import type { Meta, StoryObj } from "@storybook/react"
import FormComponent from "./Form"

// TODO Declare enum here to avoid an error in importing client-axios in Storybook.
enum TodoCategoryEnum {
    One = 'one',
    Two = 'two',
    Three = 'three'
}

const meta: Meta<typeof FormComponent> = {
    title: 'Todo/Form',
    component: FormComponent,
};
export default meta;

type Story = StoryObj<typeof FormComponent>;

export const Form: Story = {
    args: {
        initialValues: {
            id: "dummy",
            title: "Buy milk after work",
            category: TodoCategoryEnum.One,
            content: "Remember to buy milk at the grocery store on the way home."
        },
        onSubmit: () => {}
    },
};
