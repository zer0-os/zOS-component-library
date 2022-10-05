import React from 'react';

import { shallow } from 'enzyme';

import { Component as AppLayout, Properties } from './app-layout';
import { AppContextPanel } from './app-context-panel';

describe('AppLayout', () => {
  const getContext = (context: any = {}) => ({
    hasContextPanel: false,
    isContextPanelOpen: false,
    setIsContextPanelOpen: () => undefined,
    setHasContextPanel: () => undefined,
    ...context,
  });

  const subject = (props: Partial<Properties> = {}, child = <div />) => {
    const allProps = {
      context: getContext(props.context),
      ...props,
    };

    return shallow(<AppLayout {...allProps}>{child}</AppLayout>);
  };

  it('renders children', () => {
    const wrapper = subject({}, <div className='tacos' />);

    expect(wrapper.find('.app-layout .tacos').exists()).toBe(true);
  });

  it('adds className', () => {
    const wrapper = subject({ className: 'what' });

    expect(wrapper.find('.app-layout').hasClass('what')).toBe(true);
  });

  it('renders children', () => {
    const wrapper = subject({}, <div className='tacos' />);

    expect(wrapper.find('.app-layout .tacos').exists()).toBe(true);
  });

  it('updates context on render with context panel as child', () => {
    const setHasContextPanel = jest.fn();

    subject({ context: getContext({ setHasContextPanel }) }, <AppContextPanel />);

    expect(setHasContextPanel).toHaveBeenCalledWith(true);
  });

  it('updates context on render with no context panel as child', () => {
    const setHasContextPanel = jest.fn();

    subject({ context: getContext({ setHasContextPanel }) }, <div />);

    expect(setHasContextPanel).toHaveBeenCalledWith(false);
  });
});
