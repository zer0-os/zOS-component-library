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

    subject({ context: getContext({ setHasContextPanel }) }, <AppContextPanel children={<div />} />);

    expect(setHasContextPanel).toHaveBeenCalledWith(true);
  });

  it('updates context on render with no context panel as child', () => {
    const setHasContextPanel = jest.fn();

    subject({ context: getContext({ setHasContextPanel }) }, <div />);

    expect(setHasContextPanel).toHaveBeenCalledWith(false);
  });

  it('adds classes for no context panel', () => {
    const wrapper = subject({
      context: getContext({
        hasContextPanel: false,
        isContextPanelOpen: false,
      }),
    });

    const layout = wrapper.find('.app-layout');

    expect(layout.hasClass('context-panel-open')).toBe(false);
    expect(layout.hasClass('has-context-panel')).toBe(false);
  });

  it('sets classes when hasContextPanel is true', () => {
    const wrapper = subject({
      context: getContext({
        hasContextPanel: true,
        isContextPanelOpen: false,
      }),
    });

    const layout = wrapper.find('.app-layout');

    expect(layout.hasClass('context-panel-open')).toBe(false);
    expect(layout.hasClass('has-context-panel')).toBe(true);
  });

  it('sets classes when isContextPanelOpen is true', () => {
    const wrapper = subject({
      context: getContext({
        hasContextPanel: true,
        isContextPanelOpen: true,
      }),
    });

    const layout = wrapper.find('.app-layout');

    expect(layout.hasClass('context-panel-open')).toBe(true);
    expect(layout.hasClass('has-context-panel')).toBe(true);
  });
});
