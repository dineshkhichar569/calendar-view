import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    primary: { control: 'boolean' },
    size: { control: { type: 'select' }, options: ['small', 'medium', 'large'] },
    onClick: { action: 'clicked' },
  },
  args: {
    primary: false,
    size: 'medium',
    children: 'Button',
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { primary: true, children: 'Button' },
};

export const Secondary: Story = {
  args: { primary: false, children: 'Button' },
};

export const Large: Story = {
  args: { size: 'large', children: 'Button' },
};

export const Small: Story = {
  args: { size: 'small', children: 'Button' },
};
