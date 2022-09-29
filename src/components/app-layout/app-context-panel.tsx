import React from 'react';
import classNames from 'classnames';
import { ContextPanelTab } from './context-panel-tab';

interface State {
  isOpen: boolean;
}

export class AppContextPanel extends React.Component<{}, State> {
  state = { isOpen: false };

  handleClick = () => {
    this.setState({ isOpen: !this.isOpen });
  }

  get isOpen() {
    return this.state.isOpen;
  }

  render() {
    const className = classNames('app-context-panel', {
      'open': this.isOpen,
      'closed': !this.isOpen,
    });

    return (
      <div className={className}>
        <div className='app-context-panel__content'>
          {this.props.children}
        </div>
        <ContextPanelTab onClick={this.handleClick} className='app-context-panel__target' />
      </div>
    );
  }
}
