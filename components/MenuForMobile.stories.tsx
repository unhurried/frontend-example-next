import type { Meta, StoryObj } from "@storybook/react"
import MenuForMobileComponent from "./MenuForMobile";

const meta: Meta<typeof MenuForMobileComponent> = {
    title: 'Todo/MenuForMobile',
    component: MenuForMobileComponent,
};
export default meta;

type Story = StoryObj<typeof MenuForMobileComponent>;

export const MenuForMobile: Story = {
    args: {
        username: "johnsmith",
        links: [{ text: "My Account", href: "/" }],
    },
};
