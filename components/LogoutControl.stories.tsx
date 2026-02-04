import type { Meta, StoryObj } from "@storybook/react"
import LogoutControlComponent from "./LogoutControl";

const meta: Meta<typeof LogoutControlComponent> = {
    title: 'Todo/LogoutControl',
    component: LogoutControlComponent,
};

export default meta;
type Story = StoryObj<typeof LogoutControlComponent>;

export const LogoutControl: Story = {
    args: {
        username: "johnsmith",
    }
};
