import React from 'react';

import './styles.css';

export interface Properties {
  supportedChainId: string;
}

export class ErrorNetwork extends React.Component<Properties> {
  render() {
    const supportedChainId = this.props.supportedChainId;

    return (
      <div className="error-network">
        <span title={supportedChainId} className="error-network__chainId">
          Please switch to Supported Network {supportedChainId} in your wallet before connecting
        </span>
      </div>
    );
  }
}
