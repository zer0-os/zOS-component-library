import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

import { AppLayoutContext, withContext } from './context';
import { AppContextPanel } from '.';

export interface Properties {
  context: AppLayoutContext;
  className?: string;
}

export class Component extends React.Component<PropsWithChildren<Properties>> {
  componentDidMount() {
    this.validateChildren();
  }

  validateChildren = () => {
    let hasContextPanel = false;

    React.Children.forEach(this.props.children, (child: any) => {
      if (child.type === AppContextPanel) {
        hasContextPanel = true;
      }
    });

    this.props.context.setHasContextPanel(hasContextPanel);
  };

  render() {
    return <div className={classNames('app-layout', this.props.className)}>{this.props.children}</div>;
  }
}

export const AppLayout = withContext<{}>(Component);
