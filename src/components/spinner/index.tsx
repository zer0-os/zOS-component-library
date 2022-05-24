import React from 'react';
import classNames from 'classnames';

export interface Properties {
  className?: string;
}

export class Spinner extends React.Component<Properties> {
  render() {
    return <div className={classNames('spinner', this.props.className)}></div>;
  }
}
