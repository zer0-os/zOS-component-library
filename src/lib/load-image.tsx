const once = require('once');
const doc = require('global/document');
const load = require('load-img');

const ImageParent = once(function loadParent() {
  const element = doc.createElement('load-image-parent');

  const styles = {
    position: 'absolute',
    width: 0,
    height: 0,
    visibility: 'hidden',
    overflow: 'hidden',
  };
  Object.keys(styles).forEach(key => {
    element.style[key] = styles[key];
  });
  doc.body.appendChild(element);

  return element;
});

export function loadImage(src, callback) {
  const parent = ImageParent();
  const image = load(src, onload);

  parent.appendChild(image);

  function onload(error, image) {
    parent.removeChild(image);
    callback(error, image);
  }
}
