import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IconButton } from '../components/icon-button';
import { Icons } from '../components/icon-button/icons';

import './icon-button.css';

export default {
  title: 'IconButton',
  component: IconButton,
  args: {
    className: 'storybook-icon-button',
  },
} as ComponentMeta<typeof IconButton>;

export const Sun = (args) => <IconButton icon={Icons.Sun} {...args} />;
export const Moon = (args) => <IconButton icon={Icons.Moon} {...args} />;
