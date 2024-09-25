import {Meta, StoryFn} from "@storybook/react"
import Input from "./Input"
import { useState } from "react";

export default {
    argTypes: {
        isDisabled: {control: 'boolean'},
        placeholder: {control: 'text'},
        value: {control: 'text'}
    },
    component: Input,
    title: 'Components/common/Input'
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => {
    return (
        <Input {...args} />
    )
}

const defaultTemplateArgs = {
    isDisabled: false,
    placeholder: '',
    value: ''
}

export const Primary = Template.bind({});
Primary.args = {
    ...defaultTemplateArgs
}

export const Disabled = Template.bind({});
Disabled.args = {
    ...defaultTemplateArgs,
    isDisabled: true
}