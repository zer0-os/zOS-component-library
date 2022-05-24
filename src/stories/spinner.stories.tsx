import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Spinner } from '../components/spinner';

import './spinner.css';

export default {
  title: 'Spinner',
  component: Spinner,
  args: {
    className: 'storybook-spinner',
  },
} as ComponentMeta<typeof Spinner>;

export const Basic = (args) => <Spinner {...args} />;
