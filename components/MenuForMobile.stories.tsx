import { ComponentMeta, ComponentStory } from "@storybook/react"
import MenuForMobile from "./MenuForMobile";

export default {
    title: 'Todo/MenuForMobile',
    component: MenuForMobile,
} as ComponentMeta<typeof MenuForMobile>;

const Template: ComponentStory<typeof MenuForMobile> = (args) => <MenuForMobile {...args}/>;
export const Form = Template.bind({});
Form.args = {
    username: "johnsmith",
    links: [{ text: "My Account", href: "/" }],
}
