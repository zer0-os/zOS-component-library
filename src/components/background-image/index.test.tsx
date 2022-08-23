/**
 * @jest-environment jsdom
 */

import { mount } from 'enzyme';
import { BackgroundImage, Properties } from './';
import uuid from 'uuid';

describe('background-image', () => {
  const subject = (props: Partial<any> = {}) => {
    const source = `https://zer0.io/assets/alt/${uuid.v4()}.png`;

    const loadImage = (_notUsed, callback) => {
      return callback(undefined, <img src={source} />);
    };

    const provider = { ...{
      getSource: () => { return `http://res.cloudinary.com/image/fetch/https://zer0.io/assets/alt/${uuid.v4()}.png` },
      getSourceUrl: () => { return `https://zer0.io/assets/alt/${uuid.v4()}.png` }
    }, ...props.provider };
    delete props.provider;

    const allProps: Properties = {
      source,
      loadImage,
      provider,
      ...props,
    };

    return mount(<BackgroundImage {...allProps} />);
  };

  it('verifies source', () => {
    const expectation = 'https://zer0.io/assets/zero-logo.png';

    const wrapper = subject({ source: expectation });

    expect(wrapper.find('div').prop('data-src')).toEqual(expectation);
  });

  it('verifies alwaysFadeIn', () => {
    const wrapper = subject({ alwaysFadeIn: true });

    const ref = wrapper.find('div').getDOMNode();

    expect(ref.className).toInclude('fade-in');
  });

  it('verifies fadeSpeed', () => {
    const wrapper = subject({ fadeSpeed: 'medium' });

    const ref = wrapper.find('div').getDOMNode();

    expect(ref.className).toInclude('fade-double');
  });

  it('verifies className', () => {
    const expectation = 'a-custom-class-name';

    const wrapper = subject({ className: expectation });

    expect(wrapper.find('div').hasClass(expectation)).toBeTruthy();
  });

  it('verifies options passed to getSource', () => {
    const source = `http://res.cloudinary.com/image/fetch/blob/https://zer0.io/assets/alt/${uuid.v4()}.png`;
    const expectation = { src: source, options: { width: 330, crop: 'fill' } };

    const provider = { getSource: jest.fn(() => { return expectation.src }) };

    subject({ provider, source: expectation.src, options: expectation.options });

    expect(provider.getSource).toHaveBeenCalledWith(expectation);
  });

  it('verifies ref after getSource', () => {
    const source = `https://zer0.io/assets/alt/${uuid.v4()}.png`;

    const provider = { getSource: jest.fn(() => { return source }) };

    const wrapper = subject({ provider });

    const ref = wrapper.find('div').getDOMNode();

    expect(ref.style['background-image']).toEqual(`url(${source})`);
    expect(ref.className).toInclude('background-image');
    expect(ref.className).toInclude('fade-in');
  });


  it('verifies onImageLoad callback', () => {
    const expectation = jest.fn();

    subject({ onImageLoad: expectation });

    expect(expectation).toHaveBeenCalled();
  });

  it('verifies children', () => {
    const expectation = <h1>Hello World!</h1>;

    const wrapper = subject({ children: expectation });

    expect(wrapper.find('div').contains(expectation)).toBeTruthy();
  });

  it('verifies title', () => {
    const expectation = 'this-is-a-title';

    const wrapper = subject({ title: expectation });

    expect(wrapper.find('div').prop('title')).toEqual(expectation);
  });

  it('verifies autoSize', () => {
    const expectation = { height: 321, width: 456 };

    const loadImage = (_notUsed, callback) => {
      return callback(undefined, { ...expectation });
    };

    const wrapper = subject({ autoSize: true, loadImage });

    const ref = wrapper.find('div').getDOMNode();

    expect(ref.style['height']).toEqual(`${expectation.height}px`);
    expect(ref.style['width']).toEqual(`${expectation.width}px`);
  });

  it('verifies hoverZoom, shaded', () => {
    const expectations = ['hover-zoom', 'background-image__shaded'];

    const wrapper = subject({ hoverZoom: true, shaded: true });

    expectations.forEach(expectation => {
      expect(wrapper.find('div').hasClass(expectation)).toBeTruthy();
    });
  });

  it('verifies autoHeight', () => {
    const expectation = 123;

    const loadImage = (_notUsed, callback) => {
      return callback(undefined, { height: expectation });
    };

    const wrapper = subject({ autoHeight: true, loadImage });

    const ref = wrapper.find('div').getDOMNode();

    expect(ref.style['height']).toEqual(`${expectation}px`);
    expect(ref.style['width']).toBeFalsy();
  });

  it('verifies minHeight', () => {
    const expectation = 1;

    const wrapper = subject({ minHeight: expectation });

    expect(wrapper.find('div').prop('style')).toEqual({ minHeight: expectation });
  });

  it('verifies style', () => {
    const expectation = { style: { 'display': 'block' } };

    const wrapper = subject({ ...expectation });

    expect(wrapper.prop('style')).toEqual(expectation.style);
  });

  it('verifies local', () => {
    const getSource = jest.fn();

    subject({ local: true, getSource });

    expect(getSource).not.toHaveBeenCalled();
  });

  it('verifies getSourceUrl', () => {
    const provider = { getSourceUrl: jest.fn(() => { return `https://zer0.io/assets/alt/${uuid.v4()}.png` }) };

    const wrapper = subject({ provider });

    const source = `https://zer0.io/assets/alt/${uuid.v4()}.png`;
    wrapper.setProps({ source });

    expect(provider.getSourceUrl).toHaveBeenCalledWith(source);
  });
});
