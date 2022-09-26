import React from 'react';

import { shallow } from 'enzyme';

import { AppContextPanel } from './app-context-panel';

describe('AppContextPanel', () => {
  const subject = (child = <div />) => {
    return shallow(<AppContextPanel>{child}</AppContextPanel>);
  };

  it('renders children', () => {
    const wrapper = subject(<div className='tacos' />);

    expect(wrapper.find('.app-context-panel__content .tacos').exists()).toBe(true);
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
