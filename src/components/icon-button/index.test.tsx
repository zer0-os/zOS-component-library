import React from 'react';
import { shallow } from 'enzyme';

import { Icons } from './icons';
import { Component, IconSize } from '.';

describe('IconButton', () => {
  const subject = (props: any = {}) => {
    const allProps = {
      getIcon: () => <path />,
      onClick: () => undefined,
      ...props,
    };

    return shallow(<Component {...allProps} />);
  };

  it('adds className to main element', () => {
    const wrapper = subject({ className: 'tacos' });

    expect(wrapper.find('.icon-button').hasClass('tacos')).toBe(true);
  });

  it('adds default size class', () => {
    const wrapper = subject();

    expect(wrapper.find('.icon-button').hasClass('large')).toBe(true);
  });

  it('adds class for small size', () => {
    const wrapper = subject({ size: IconSize.Small });

    expect(wrapper.find('.icon-button').hasClass('small')).toBe(true);
  });

  it('adds class for medium size', () => {
    const wrapper = subject({ size: IconSize.Medium });

    expect(wrapper.find('.icon-button').hasClass('medium')).toBe(true);
  });

  it('adds class for large size', () => {
    const wrapper = subject({ size: IconSize.Large });

    expect(wrapper.find('.icon-button').hasClass('large')).toBe(true);
  });

  it('adds class for extra large size', () => {
    const wrapper = subject({ size: IconSize.XLarge });

    expect(wrapper.find('.icon-button').hasClass('extra-large')).toBe(true);
  });

  it('adds class for extra extra large size', () => {
    const wrapper = subject({ size: IconSize.XXLarge });

    expect(wrapper.find('.icon-button').hasClass('extra-extra-large')).toBe(true);
  });

  it('adds class to svg element', () => {
    const wrapper = subject({ icon: Icons.ChevronLeft });

    expect(wrapper.find('svg.icon-button__icon').hasClass('zui-chevron-left')).toBe(true);
  });

  it('propagates click', () => {
    const onClick = jest.fn();

    const wrapper = subject({ onClick });

    wrapper.find('button').simulate('click');

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('adds icon to svg element', () => {
    const iconContent = <path className='the-icon' d="M5.35442 5.70699L1.28601" />;
    const getIcon = jest.fn((icon) => icon === Icons.ChevronLeft ? iconContent : <path />);

    const wrapper = subject({ getIcon, icon: Icons.ChevronLeft });

    expect(wrapper.find('svg.icon-button__icon .the-icon').exists()).toBe(true);
  });
});
