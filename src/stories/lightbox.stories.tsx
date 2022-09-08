import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Lightbox, Properties } from '../components/lightbox';

export default {
  title: 'Lightbox',
  component: Lightbox,
  args: {
    items: [
      { url: 'https://media.giphy.com/media/3oKIPmUUz1MT9u3UA0/giphy.gif' },
      { url: 'https://media.giphy.com/media/hQoZngQ2fGYCW3iykz/giphy.gif' },
    ],
    startingIndex: 0,
    provider: {
      getSource: (source) => { return source.src; },
      fitWithinBox: () => {},
    }
  },
} as ComponentMeta<typeof Lightbox>;

export const Template: ComponentStory<Properties> = (args) => <Lightbox {...args} />

