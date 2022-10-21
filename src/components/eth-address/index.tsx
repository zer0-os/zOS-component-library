import React from 'react';
import classNames from 'classnames';
import { Button } from '../button';

export interface Properties {
  address: string;
  onClick: () => void;
  className?: string;
}

export class EthAddress extends React.Component<Properties> {
  onClick = () => {
    this.props.onClick();
  };

  render() {
    const { address } = this.props;

    return (
      <div className={classNames('eth-address', this.props.className)}>
        <span title={address} className='eth-address__address'>
          <span>{address.slice(0, 6)}</span>
          <span>...</span>
          <span className='eth-address__address-last-four'>
            {address.slice(-4)}
          </span>
        </span>
        <div className='eth-address__panel'>
          <div className='eth-address__panel-btn'>
            <Button
              className='eth-address__panel-btn-disconnect'
              label='Disconnect'
              onClick={this.onClick}
            />
          </div>
        </div>
      </div>
    );
  }
}
