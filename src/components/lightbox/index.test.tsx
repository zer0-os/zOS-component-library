import { shallow } from 'enzyme';
import { default as ReactImageLightbox } from 'react-image-lightbox';
const _ = require('lodash');

import { Lightbox, Properties } from '.';

describe('lightbox', () => {
  const items = [{ url: 'image0.jpg', type: 'image' }, { url: 'image1.jpg', type: 'image' }, { url: 'image2.jpg', type: 'image' }];

  const cloudinaryify = image => 'http://res.cloudinary.com/fact0ry-dev/image/upload/' + image;

  const subject = (props: Partial<Properties> = {}) => {
    const provider = { ...{
      fitWithinBox: () => {},
      getSource: (source) => { return cloudinaryify(source.src) },
    }, ...props.provider };

    delete props.provider;

    const allProps: Properties = {
      items,
      provider,

      ...props,
    };

    return shallow(<Lightbox {...allProps} />);
  };

  it('defaults to the main image as the first', function() {
    const wrapper = subject();
  
    expect(wrapper.find(ReactImageLightbox).prop('mainSrc')).toEqual(cloudinaryify(items[0].url));
  });

  it('starts at the starting index', function() {
    const wrapper = subject({ startingIndex: 1 });

    expect(wrapper.find(ReactImageLightbox).prop('mainSrc')).toEqual(cloudinaryify(items[1].url));
  });

  it('sets next and prev appropriately', function() {
    const wrapper = subject({ startingIndex: 1 });

    const imagesSrc = _.pick(wrapper.find(ReactImageLightbox).props(), ['mainSrc', 'nextSrc', 'prevSrc']);
    expect(imagesSrc).toEqual({
      mainSrc: cloudinaryify(items[1].url),
      nextSrc: cloudinaryify(items[2].url),
      prevSrc: cloudinaryify(items[0].url),
    });
  });

  it('moves next on the lightbox', function() {
    const wrapper = subject();

    expect(wrapper.find(ReactImageLightbox).prop('mainSrc')).toEqual(cloudinaryify(items[0].url));

    wrapper.find(ReactImageLightbox).simulate('moveNextRequest');
    expect(wrapper.find(ReactImageLightbox).prop('mainSrc')).toEqual(cloudinaryify(items[1].url));

    wrapper.find(ReactImageLightbox).simulate('moveNextRequest');
    expect(wrapper.find(ReactImageLightbox).prop('mainSrc')).toEqual(cloudinaryify(items[2].url));

    wrapper.find(ReactImageLightbox).simulate('moveNextRequest');
    expect(wrapper.find(ReactImageLightbox).prop('mainSrc')).toEqual(cloudinaryify(items[0].url));
  });

  it('moves previous on the lightbox', function() {
    const wrapper = subject();

    expect(wrapper.find(ReactImageLightbox).prop('mainSrc')).toEqual(cloudinaryify(items[0].url));

    wrapper.find(ReactImageLightbox).simulate('movePrevRequest');
    expect(wrapper.find(ReactImageLightbox).prop('mainSrc')).toEqual(cloudinaryify(items[2].url));

    wrapper.find(ReactImageLightbox).simulate('movePrevRequest');
    expect(wrapper.find(ReactImageLightbox).prop('mainSrc')).toEqual(cloudinaryify(items[1].url));

    wrapper.find(ReactImageLightbox).simulate('movePrevRequest');
    expect(wrapper.find(ReactImageLightbox).prop('mainSrc')).toEqual(cloudinaryify(items[0].url));
  });

  it('closes the lightbox', function() {
    const onClose = jest.fn();

    const wrapper = subject({ onClose });

    wrapper.find(ReactImageLightbox).simulate('closeRequest');

    expect(onClose).toHaveBeenCalled();
  });

  it('does not set next and prev when there is a single image', function() {
    const wrapper = subject({ items: [items[0]] });

    expect(wrapper.find(ReactImageLightbox).prop('mainSrc')).toEqual(cloudinaryify(items[0].url));
    expect(wrapper.find(ReactImageLightbox).prop('nextSrc')).toBeFalsy();
    expect(wrapper.find(ReactImageLightbox).prop('prevSrc')).toBeFalsy();
  });

  it('verifies width constraint', function() {
    const assets = { url: 'blah.jpg', type: 'image', width: 5000 };
    const provider = { fitWithinBox: jest.fn() };

    subject({ items: [assets], provider });

    expect(provider.fitWithinBox).toHaveBeenCalledWith(assets, 2000, 1500);
  });

  it('verifies height constraint', function() {
    const image = { url: 'blah.jpg', type: 'image', height: 5000 };
    const provider = { fitWithinBox: jest.fn() };

    subject({ items: [image], provider });

    expect(provider.fitWithinBox).toHaveBeenCalledWith(image, 2000, 1500);
  });
});
