import { ComponentMeta, ComponentStory } from "@storybook/react";
import FormComponent from "./Form";

export default {
    title: 'Todo/Form',
    component: FormComponent,
} as ComponentMeta<typeof FormComponent>;

const Template: ComponentStory<typeof FormComponent> = (args) => <FormComponent {...args} />;
export const Form = Template.bind({});
Form.args = {
    initialValues: {
        title: "Buy milk after work",
        category: "one",
        content: "Remember to buy milk at the grocery store on the way home."
    },
    onSubmit: () => {}
}
