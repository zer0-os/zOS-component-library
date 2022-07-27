import React from 'react';
import classNames from 'classnames';

export interface Properties {
  url: string;
  className?: string;
  openInNewTab?: boolean;
}

export class ButtonLink extends React.Component<Properties, undefined> {
  get href() {
    const { url } = this.props;
    let protocol = '';

    if (!/^http[s]?:\/\/(.*)$/.test(url)) {
      protocol = 'https://';
    }

    return `${protocol}${url}`;
  }

  renderLink() {
    const linkProps: any = {
      className: classNames('button-link', this.props.className),
      href: this.href,
    };

    if (this.props.openInNewTab) {
      linkProps.target = '_blank';
      linkProps.rel = 'noreferrer noopener';
    }

    return (
      <a {...linkProps}>
        <div className='button-link__label'>
          {this.props.children}
        </div>
      </a>
    );
  }

  render() {
    return this.renderLink();
  }
}
