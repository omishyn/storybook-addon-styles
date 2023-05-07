import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import {withStyleResources} from '../index';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // tags: ["autodocs"],
  parameters: {
    'addon-styles': [
      {
        id: `bootstrap v4.1.3`,
        code: `<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"></link>`,
        picked: true,
      },
      {
        id: `bootstrap v3.3.5`,
        code: `<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css"></link>`,
        picked: false,
      },
      {
        id: `fontawesome`,
        code: `<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>`,
        picked: true,
      },
      {
        id: `green theme`,
        code: `<style>.fa { color: green }</style>`,
        picked: false,
      },
    ],
  },
  decorators: [withStyleResources],
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
