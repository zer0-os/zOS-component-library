import React from 'react';
import classNames from 'classnames';

import { Dialog } from '../dialog';
import { WalletSelect, Properties as WalletSelectProperties } from '.';
import { WalletType } from './wallets';
import { ErrorNetwork } from '../error-network';
import { config } from '../../config';

export interface Properties extends WalletSelectProperties {
  isConnecting: boolean;
  isNotSupportedNetwork: boolean;
  wallets: WalletType[];
  className?: string;
  onClose?: () => void;
  onSelect?: (connector: WalletType) => void;
}

export class WalletSelectModal extends React.Component<Properties> {
  handleClose = () => this.props.onClose && this.props.onClose();

  get supportedNetwork() {
    return this.props.isNotSupportedNetwork;
  }

  render() {
    return (
      <Dialog
        className={classNames('wallet-select-modal', this.props.className)}
        onClose={this.handleClose}
      >
        <WalletSelect
          wallets={this.props.wallets}
          isConnecting={this.props.isConnecting}
          onSelect={this.props.onSelect}
        />
        {this.supportedNetwork && (
          <ErrorNetwork supportedChainId={config.supportedChainId} />
        )}
      </Dialog>
    );
  }
}
