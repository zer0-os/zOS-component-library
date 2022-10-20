import React from 'react';

import { shallow } from 'enzyme';

import { ContextPanelTab } from './context-panel-tab';

describe('ContextPanelTab', () => {
  const subject = (props: any = {}) => {
    return shallow(<ContextPanelTab {...props} />);
  };

  it('adds className', () => {
    const wrapper = subject({ className: 'cats' });

    expect(wrapper.find('.context-panel-tab').hasClass('cats')).toBe(true);
  });

  it('renders svg as tab', () => {
    const wrapper = subject();

    expect(wrapper.find('svg.context-panel-tab__tab').exists()).toBe(true);
  });

  it('renders div icon', () => {
    const wrapper = subject();

    expect(wrapper.find('div.context-panel-tab__icon').exists()).toBe(true);
  });

  it('propagates click event', () => {
    const onClick = jest.fn();

    const wrapper = subject({ onClick });

    wrapper.find('.context-panel-tab').simulate('click');

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
