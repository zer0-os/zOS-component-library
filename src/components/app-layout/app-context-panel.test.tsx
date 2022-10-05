import React from 'react';

import { shallow } from 'enzyme';

import { Component as AppContextPanel } from './app-context-panel';

describe('AppContextPanel', () => {
  const getContext = (context: any = {}) => ({
    hasContextPanel: false,
    isContextPanelOpen: false,
    setIsContextPanelOpen: () => undefined,
    ...context,
  });

  const subject = (props: any = {}, child = <div />) => {
    const allProps = {
      context: getContext(props.context),
      ...props,
    };

    return shallow(<AppContextPanel {...allProps}>{child}</AppContextPanel>);
  };

  it('renders children', () => {
    const wrapper = subject({}, <div className='tacos' />);

    expect(wrapper.find('.app-context-panel__content .tacos').exists()).toBe(true);
  });

  it('renders ContextPanelTab for target', () => {
    const wrapper = subject();

    const tab = wrapper.find('ContextPanelTab.app-context-panel__target');

    expect(tab.exists()).toBe(true);
  });

  it('toggles class when target is clicked', () => {
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

  it('has open class when rendered if context.isContextPanelOpen is true', () => {
    const wrapper = subject({ context: { isContextPanelOpen: true } });

    const panel = wrapper.find('.app-context-panel');

    expect(panel.hasClass('open')).toBe(true);
  });

  it('has open class when context.isContextPanelOpen is set to true', () => {
    const wrapper = subject();

    wrapper.setProps({ context: { isContextPanelOpen: true } });

    const panel = wrapper.find('.app-context-panel');

    expect(panel.hasClass('open')).toBe(true);
  });

  it('updates context when target is clicked', () => {
    const setIsContextPanelOpen = jest.fn();

    const wrapper = subject({ context: { setIsContextPanelOpen } });

    wrapper.find('.app-context-panel__target').simulate('click');

    expect(setIsContextPanelOpen).toHaveBeenCalledWith(true);
  });
});
