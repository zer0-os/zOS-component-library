import { shallow } from 'enzyme';
import { ButtonLink, Properties } from './';

describe('button-link', () => {
  const subject = (props: Partial<Properties> = {}, content = null) => {
    const allProps: Properties = {
      url: '',
      ...props,
    };

    return shallow(<ButtonLink {...allProps}>{content}</ButtonLink>);
  };

  it('it renders the link with appropriate url', function() {
    const wrapper = subject({ url: 'http://example.com/stuff' });

    expect(wrapper.find('a').prop('href')).toEqual('http://example.com/stuff');
  });

  it('it renders the link with appropriate url for https', function() {
    const wrapper = subject({ url: 'https://example.com/stuff' });

    expect(wrapper.find('a').prop('href')).toBe('https://example.com/stuff');
  });

  it('it renders the link with https if no protocol specified', function() {
    const wrapper = subject({ url: 'example.com/stuff' });

    expect(wrapper.find('a').prop('href')).toBe('https://example.com/stuff');
  });

  it('it renders content within link', function() {
    const wrapper = subject({}, <span>Go here</span>);

    expect(wrapper.find('a').text().trim()).toBe('Go here');
  });

  it('it applies provided className', function() {
    const wrapper = subject({ className: 'some-custom-class' });

    expect(wrapper.find('a').hasClass('some-custom-class')).toBeTruthy();
  });

  it('it sets target if openInNewTab is true', function() {
    const wrapper = subject({ openInNewTab: true });

    expect(wrapper.find('a').prop('target')).toBe('_blank');
  });

  it('it sets rel if openInNewTab is true', function() {
    const wrapper = subject({ openInNewTab: true });

    expect(wrapper.find('a').prop('rel')).toBe('noreferrer noopener');
  });

  it('it does not set target or rel if openInNewTab is not true', function() {
    const wrapper = subject();

    const props = wrapper.find('a').props();

    expect(props.target).toBeFalsy();
    expect(props.rel).toBeFalsy();
  });
});
