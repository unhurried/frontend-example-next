import type { Meta, StoryObj } from "@storybook/react";
import ListComponent from "./List";

const meta: Meta<typeof ListComponent> = {
    title: 'Todo/List',
    component: ListComponent,
};

export default meta;
type Story = StoryObj<typeof ListComponent>;

export const List: Story = {
    args: {
        items: [
            { id: "1", title: "Buy milk after work.", category: 'one', content: '' },
            { id: "2", title: "Call Tom at 5 p.m.", category: 'two', content: '' },
        ],
    }
};
