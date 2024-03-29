import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import { Component as ZnsLink } from '.';

describe('ZnsLink', () => {
  const subject = (props: any = {}, children = <div />) => {
    const allProps = {
      location: { pathname: '' },
      ...props,
    };

    return shallow(<ZnsLink {...allProps}>{children}</ZnsLink>);
  };

  it('adds className to child', () => {
    const wrapper = subject({ className: 'tacos' });

    expect(wrapper.find('.zns-link').hasClass('tacos')).toBe(true);
  });

  it('renders link for route with app', () => {
    const wrapper = subject({ app: 'feed', route: 'tacos.street.pollo' });

    expect(wrapper.find(Link).prop('to')).toBe('/0.tacos.street.pollo/feed');
  });

  it('renders link for route with leading zero and app', () => {
    const wrapper = subject({ app: 'feed', route: '0.tacos.street.pollo' });

    expect(wrapper.find(Link).prop('to')).toBe('/0.tacos.street.pollo/feed');
  });

  it('renders link for root route', () => {
    const wrapper = subject({
      location: { pathname: '/0.burgers.cheese37.0/feed' },
      route: '0',
    });

    expect(wrapper.find(Link).prop('to')).toBe('/0/feed');
  });

  it('renders link for route with app when to provided', () => {
    const wrapper = subject({
      to: 'yo',
      app: 'feed',
      route: 'tacos.street.pollo',
    });

    expect(wrapper.find(Link).prop('to')).toBe('/0.tacos.street.pollo/feed/yo');
  });

  it('handles to with leading slash', () => {
    const wrapper = subject({
      to: '/yo',
      app: 'feed',
      route: 'tacos.street.pollo',
    });

    expect(wrapper.find(Link).prop('to')).toBe('/0.tacos.street.pollo/feed/yo');
  });

  it('renders contextual link when only to provided', () => {
    const wrapper = subject({
      to: 'yo',
      location: { pathname: '/0.burgers.cheese37.0/feed' }
    });

    expect(wrapper.find(Link).prop('to')).toBe('/0.burgers.cheese37.0/feed/yo');
  });

  it('uses current route if no route provided', () => {
    const wrapper = subject({ location: { pathname: '/0.burgers.cheese/feed' }, app: 'members' });

    expect(wrapper.find(Link).prop('to')).toBe('/0.burgers.cheese/members');
  });

  it('uses current route if no route provided and route has digits', () => {
    const wrapper = subject({ location: { pathname: '/0.burgers.cheese37.0/feed' }, app: 'members' });

    expect(wrapper.find(Link).prop('to')).toBe('/0.burgers.cheese37.0/members');
  });

  it('uses current app if no app provided', () => {
    const wrapper = subject({ location: { pathname: '/0.burgers.cheese/feed' }, route: 'tacos.street.pollo' });

    expect(wrapper.find(Link).prop('to')).toBe('/0.tacos.street.pollo/feed');
  });

  it('renders children', () => {
    const wrapper = subject({ route: 'tacos.street.pollo' }, <div className='tacos' />);

    expect(wrapper.find(Link).find('.tacos').exists()).toBe(true);
  });
});
