import { ComponentMeta, ComponentStory } from "@storybook/react";
import ListComponent from "./List";

// TODO Declare enum here to avoid an error in importing client-axios in Storybook.
enum TodoCategoryEnum {
    One = 'one',
    Two = 'two',
    Three = 'three'
}

export default {
    title: 'Todo/List',
    component: ListComponent,
} as ComponentMeta<typeof ListComponent>;

const Template: ComponentStory<typeof ListComponent> = (args) => <ListComponent {...args} />;

export const List = Template.bind({});
List.args = {
    items: [
        { id: "1", title: "Buy milk after work.", category: TodoCategoryEnum.One },
        { id: "2", title: "Call Tom at 5 p.m.", category: TodoCategoryEnum.Two },
    ],
}
