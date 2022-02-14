import React from 'react';
import classNames from 'classnames';

export interface Properties {
  label?: string;
  className?: string;

  onClick?: () => void;
}

export class Button extends React.Component<Properties> {
  handleClick = () => this.props.onClick && this.props.onClick();

  render() {
    return (
      <div className={classNames('button', this.props.className)} onClick={this.handleClick}>
        <span className='button__label'>{this.props.label || this.props.children}</span>
      </div>
    );
  }
}
