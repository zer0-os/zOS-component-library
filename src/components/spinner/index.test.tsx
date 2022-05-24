import React from 'react';
import { shallow } from 'enzyme';

import { Spinner } from '.';

describe('Spinner', () => {
  const subject = (props: any = {}) => {
    const allProps = {
      ...props,
    };

    return shallow(<Spinner {...allProps} />);
  };

  it('render component', () => {
    const wrapper = subject();

    expect(wrapper.hasClass('spinner')).toBe(true);
  });

  it('adds className', () => {
    const CLASS_NAME_TEST = 'taco-launcher';
    const wrapper = subject({ className: CLASS_NAME_TEST });

    expect(wrapper.hasClass(CLASS_NAME_TEST)).toBe(true);
  });
});
