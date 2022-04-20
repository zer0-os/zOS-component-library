import React from 'react';
import { ComponentMeta } from '@storybook/react';

import { WalletSelect } from '../components/wallet-select';

import './wallet-select.css';

export default {
  title: 'Wallet Select',
  component: WalletSelect,
  args: {
    className: 'storybook-wallet-select',
  },
} as ComponentMeta<typeof WalletSelect>;

export const WithDefaultWallets = (args) => <WalletSelect {...args} />;
