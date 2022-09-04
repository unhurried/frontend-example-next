import { ComponentMeta, ComponentStory } from "@storybook/react"
import LogoutControlComponent from "./LogoutControl";

export default {
    title: 'Todo/LogoutControl',
    component: LogoutControlComponent,
} as ComponentMeta<typeof LogoutControlComponent>;

const Template: ComponentStory<typeof LogoutControlComponent> = (args) => <LogoutControlComponent {...args}/>;
export const LogoutControl = Template.bind({});
LogoutControl.args = {
    username: "johnsmith",
}
