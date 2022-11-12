import { ComponentMeta, ComponentStory } from "@storybook/react";
import ListComponent from "./List";

export default {
    title: 'Todo/List',
    component: ListComponent,
} as ComponentMeta<typeof ListComponent>;

const Template: ComponentStory<typeof ListComponent> = (args) => <ListComponent {...args} />;

export const List = Template.bind({});
List.args = {
    items: [
        { id: "1", title: "Buy milk after work.", category: 'one', content: '' },
        { id: "2", title: "Call Tom at 5 p.m.", category: 'two', content: '' },
    ],
}
