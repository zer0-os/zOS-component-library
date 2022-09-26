import React from 'react';
import classNames from 'classnames';

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
        <div className='app-context-panel__target' onClick={this.handleClick} />
        <div className='app-context-panel__content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
