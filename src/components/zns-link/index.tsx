import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import classNames from 'classnames';

export interface PublicProperties extends React.LinkHTMLAttributes<Link> {
  className?: string;
  app?: string;
  route?: string;
  to?: string;
}

interface Properties extends PublicProperties {
  location: { pathname: string };
}

export class Component extends React.Component<Properties> {
  pathRegex = /\/([a-zA-Z0-9.]+)\/(\w+)/;

  get route() {
    if (!this.props.route) return this.zosLocation.route;

    return this.props.route;
  }

  get app() {
    if (!this.props.app) return this.zosLocation.app;

    return this.props.app;
  }

  get fullRoute() {
    let route = this.route;

    if (route !== '0' && !route.startsWith('0.')) {
      route = `0.${route}`;
    }

    return `/${route}/${this.app}${this.path}`;
  }

  get path() {
    if (!this.props.to) return '';

    return `/${this.props.to}`.replaceAll('//', '/');
  }

  get zosLocation() {
    const currentPath = this.props.location.pathname;

    if (!this.pathRegex.test(currentPath)) return { route: '', app: '' };

    const [, route, app] = currentPath.match(this.pathRegex);

    return { route, app };
  }

  render() {
    const { className, children, ...rest } = this.props;
    return (
      <Link
        className={classNames('zns-link', className)}
        {...rest}
        to={this.fullRoute}
      >
        {children}
      </Link>
    );
  }
}

export const ZnsLink = withRouter<PublicProperties>(Component);
