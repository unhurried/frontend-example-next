import { ComponentMeta, ComponentStory } from "@storybook/react"
import MenuForDesktopComponent from "./MenuForDesktop";

export default {
    title: 'Todo/MenuForDesktop',
    component: MenuForDesktopComponent,
} as ComponentMeta<typeof MenuForDesktopComponent>;

const Template: ComponentStory<typeof MenuForDesktopComponent> = (args) => <MenuForDesktopComponent {...args}/>;
export const MenuForDesktop = Template.bind({});
MenuForDesktop.args = {
    links: [{ text: "My Account", href: "/" }, { text: "Create Item", href: "/" }],
}
