import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { AppLayoutContext, withContext } from './context';
import { AppContextPanel } from '.';

export interface Properties extends PublicProperties {
  context: AppLayoutContext;
}

interface PublicProperties {
  children: ReactNode;
  className?: string;
}

export class Component extends React.Component<Properties> {
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

export const AppLayout = withContext<PublicProperties>(Component);
