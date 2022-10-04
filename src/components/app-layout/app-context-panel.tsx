import React from 'react';
import classNames from 'classnames';
import { ContextPanelTab } from './context-panel-tab';
import { AppLayoutContext, withContext } from './context';

interface Properties {
  context: AppLayoutContext;
}

interface State {
  isOpen: boolean;
}

export class Component extends React.Component<Properties, State> {
  constructor(props) {
    super(props);

    this.state = { isOpen: props.context.isContextPanelOpen };
  }

  componentDidUpdate(prevProps: Readonly<Properties>) {
    const { context: prevContext } = prevProps;
    const { isContextPanelOpen: isOpen } = this.props.context;

    if (isOpen !== prevContext.isContextPanelOpen) {
      this.setState({ isOpen });
    }
  }

  handleClick = () => {
    const newIsOpen = !this.isOpen;

    this.setState(
      { isOpen: newIsOpen },
      () => this.props.context.setIsContextPanelOpen(newIsOpen),
    );
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

export const AppContextPanel = withContext<{}>(Component);
