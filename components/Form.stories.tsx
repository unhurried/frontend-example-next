import { ComponentMeta, ComponentStory } from "@storybook/react"
import FormComponent from "./Form"

// TODO Declare enum here to avoid an error in importing client-axios in Storybook.
enum TodoCategoryEnum {
    One = 'one',
    Two = 'two',
    Three = 'three'
}

export default {
    title: 'Todo/Form',
    component: FormComponent,
} as ComponentMeta<typeof FormComponent>;

const Template: ComponentStory<typeof FormComponent> = (args) => <FormComponent {...args} />;
export const Form = Template.bind({});
Form.args = {
    initialValues: {
        id: "dummy",
        title: "Buy milk after work",
        category: TodoCategoryEnum.One,
        content: "Remember to buy milk at the grocery store on the way home."
    },
    onSubmit: () => {}
}
