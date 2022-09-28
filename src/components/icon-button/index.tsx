import React from 'react';
import classNames from 'classnames';

import { getIcon, Icons } from './icons';

import './styles.css';

export enum IconSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'extra-large',
  XXLarge = 'extra-extra-large',
}

interface PublicProperties {
  icon: Icons;
  className?: string;
  size?: IconSize;

  onClick: () => void;
}

export interface Properties extends PublicProperties {
  getIcon: (icon: Icons) => any;
}

export class Component extends React.Component<Properties> {
  get iconClass() {
    return classNames('icon-button__icon', `zui-${this.props.icon}`);
  }

  get buttonClass() {
    return classNames(
      'icon-button',
      (this.props.size || 'large'),
      this.props.className,
    );
  }

  get icon() {
    return this.props.getIcon(this.props.icon);
  }

  // Note that viewbox doesn't work correctly with every icon. The svg icons in figma will be difficult to support in a unified component.
  // I believe that we will add an export tool at some point, but for now this should sort of work for the icons we currently have.
  render() {
    return (
      <button className={this.buttonClass} onClick={this.props.onClick}>
        <svg preserveAspectRatio='xMinYMin meet' viewBox='0 0 21 21' className={this.iconClass} fill="none" xmlns="http://www.w3.org/2000/svg">
          {this.icon}
        </svg>
      </button>
    );
  }
}

export const IconButton: React.FC<PublicProperties> = (props) => <Component {...props} getIcon={getIcon} />;
