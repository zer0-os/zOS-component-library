/**
 * @jest-environment jsdom
 */

import { mount } from 'enzyme';
import { VideoPlayer, Properties } from './';

describe('video-player', () => {
  const subject = (props: Partial<Properties> = {}, content = null) => {
    const allProps: Properties = {
      url: '',
      ...props,
    };

    return mount(<VideoPlayer {...allProps}>{content}</VideoPlayer>);
  };

  it('it renders the link with appropriate url', function() {
    const wrapper = subject({ url: 'http://example.com/stuff' });

    expect(wrapper.find(VideoPlayer).prop('url')).toEqual('http://example.com/stuff');
  });

  it('it applies provided className', function() {
    const wrapper = subject({ className: 'some-custom-class' });

    expect(wrapper.find(VideoPlayer).hasClass('some-custom-class')).toBeTruthy();
  });

  it('it sets autoplay', function() {
    const wrapper = subject({ autoplay: true });

    expect(wrapper.find(VideoPlayer).prop('autoplay')).toBeTruthy();
  });
});
