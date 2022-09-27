import React from 'react';

import { shallow } from 'enzyme';

import { AppContextPanel } from './app-context-panel';
import { Icons } from '../icon-button/icons';
import {IconButton, IconSize} from '../icon-button';

describe('AppContextPanel', () => {
  const subject = (child = <div />) => {
    return shallow(<AppContextPanel>{child}</AppContextPanel>);
  };

  it('renders children', () => {
    const wrapper = subject(<div className='tacos' />);

    expect(wrapper.find('.app-context-panel__content .tacos').exists()).toBe(true);
  });

  it('renders filter icon for target', () => {
    const wrapper = subject();

    const target = wrapper.find('IconButton.app-context-panel__target');

    expect(target.prop('icon')).toBe(Icons.Filter);
  });

  it('renders medium icon button', () => {
    const wrapper = subject();

    expect(wrapper.find(IconButton).prop('size')).toBe(IconSize.Medium);
  });

  it('adds toggles class when target is clicked', () => {
    const wrapper = subject();

    wrapper.find('.app-context-panel__target').simulate('click');

    expect(wrapper.find('.app-context-panel').hasClass('open')).toBe(true);

    wrapper.find('.app-context-panel__target').simulate('click');

    expect(wrapper.find('.app-context-panel').hasClass('closed')).toBe(true);
  });

  it('has closed class when rendered by default', () => {
    const wrapper = subject();

    const panel = wrapper.find('.app-context-panel');

    expect(panel.hasClass('closed')).toBe(true);
  });
});
