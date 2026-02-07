import type { Meta, StoryObj } from "@storybook/react";
import MenuForDesktopComponent from "./MenuForDesktop";

const meta: Meta<typeof MenuForDesktopComponent> = {
    title: 'Todo/MenuForDesktop',
    component: MenuForDesktopComponent,
};

export default meta;
type Story = StoryObj<typeof MenuForDesktopComponent>;

export const MenuForDesktop: Story = {
    args: {
        links: [{ text: "My Account", href: "/" }, { text: "Create Item", href: "/" }],
    },
};
