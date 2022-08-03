/**
 * @jest-environment jsdom
 */

import { mount } from 'enzyme';
import { BackgroundImage, Properties } from './';

describe('background-image', () => {
  const subject = (props: Partial<Properties> = {}) => {
    const allProps: Properties = {
      source: 'https://zer0.io/assets/alt/zero-logo.png',
      ...props,
    };

    return mount(<BackgroundImage {...allProps} />);
  };

  // What can I test?
  // render classnames, height
  // cache
  // transition
  // intialLoad
  // new image
  it('verifies source', () => {
    const expectation = 'https://zer0.io/assets/zero-logo.png';

    const wrapper = subject({ source: expectation });

    expect(wrapper.find('div').prop('data-src')).toEqual(expectation);
  })

  it('verifies title', () => {
    const expectation = 'this-is-a-title';

    const wrapper = subject({ title: expectation });

    expect(wrapper.find('div').prop('title')).toEqual(expectation);
  })

  it('verifies class name prop', () => {
    const expectation = 'a-custom-class-name';

    const wrapper = subject({ className: expectation });

    expect(wrapper.find('div').hasClass(expectation)).toBeTruthy();
  })

  it('verifies class name via options', () => {
    const expectations = ['fade-double', 'hover-zoom', 'background-image__shaded'];

    const wrapper = subject({ fadeSpeed: 'medium', hoverZoom: true, shaded: true });

    expectations.forEach(expectation => {
      expect(wrapper.find('div').hasClass(expectation)).toBeTruthy();
    })
  })

  it('verifies min height', () => {
    const expectation = 1;

    const wrapper = subject({ minHeight: expectation });

    expect(wrapper.find('div').prop('style')).toEqual({ minHeight: expectation })
  })

  it('verifies children', () => {
    const expectation = <h1>Hello World!</h1>;

    const wrapper = subject({ children: expectation });
    console.log(wrapper.find('div').debug())

    expect(wrapper.find('div').contains(expectation)).toBeTruthy();
  })
});
