import { ComponentMeta, ComponentStory } from "@storybook/react"
import MenuForMobileComponent from "./MenuForMobile";

export default {
    title: 'Todo/MenuForMobile',
    component: MenuForMobileComponent,
} as ComponentMeta<typeof MenuForMobileComponent>;

const Template: ComponentStory<typeof MenuForMobileComponent> = (args) => <MenuForMobileComponent {...args}/>;
export const MenuForMobile = Template.bind({});
MenuForMobile.args = {
    username: "johnsmith",
    links: [{ text: "My Account", href: "/" }],
}
