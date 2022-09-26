import React from 'react';
import classNames from 'classnames';

interface State {
  isOpen: boolean;
}

export class AppContextPanel extends React.Component<{}, State> {
  state = { isOpen: false };

  handleClick = () => {
    this.setState({ isOpen: true });
  }

  render() {
    const className = classNames('app-context-panel', {
      'open': this.state.isOpen,
      'closed': !this.state.isOpen,
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
