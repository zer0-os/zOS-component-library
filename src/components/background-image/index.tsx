import { once } from 'lodash';
import React from 'react';
import classNames from 'classnames';

import { loadImage } from '../../lib/load-image';

export interface Properties {
  source: string;
  alwaysFadeIn?: boolean;
  fadeSpeed?: 'medium';
  className?: string;
  options?: ImageOptions;
  onImageLoad?: () => void;
  children?: any;
  title?: string;
  autoSize?: boolean;
  hoverZoom?: boolean;
  autoHeight?: boolean;
  shaded?: boolean;
  minHeight?: string;
  style?: React.CSSProperties;
  local?: boolean;

  provider: any;
  loadImage?: any;
}

export interface ImageOptions {
  width?: number;
  height?: number;
  crop?: 'thumb' | 'fill' | 'lfill' | 'fit';
  gravity?: 'auto' | 'face:auto' | 'faces:auto';
  radius?: 'max';
  format?: 'png' | 'jpg'; // this option only works if you don't provide an extension with the filename
  fetch_format?: 'png' | 'jpg'; // force the format even if a different format specified in filename
  background?: 'black' | 'transparent';
  transformation?: any[];
  resource_type?: 'image' | 'video';
}

const cache = {};

export class BackgroundImage extends React.Component<Properties> {
  private loadImage;

  constructor(props) {
    super(props);

    this.loadImage = props.loadImage || loadImage;
  }

  root = null;
  source: string = null;
  animationEnded: () => void = null;
  isIdle = false;
  onIdle: () => void = () => null;

  componentDidMount() {
    this.initialLoad();
  }

  componentWillReceiveProps(nextProps: Properties) {
    if (this.props.provider.getSourceUrl(this.props.source) !== this.props.provider.getSourceUrl(nextProps.source)) {
      this.transitionToNewImage(nextProps);
    }

    this.setStyle(nextProps);
  }

  initialLoad = () => {
    if (this.hasSource()) {
      this.isIdle = false;
      this.downloadImage(this.props);
    }
  }

  setStyle = (props: Properties = this.props) => {
    if (!this.isIdle || !props.style) {
      return;
    }

    for (const styleKey of Object.keys(props.style)) {
      this.root.style[styleKey] = props.style[styleKey];
    }
  }

  transitionToNewImage = (nextProps: Properties) => {
    // going from background => background
    if (this.hasSource() && this.hasSource(nextProps)) {
      const transitionFromImageToImage = (props) => {
        this.isIdle = false;
        this.setAnimationClass('fade-out');
        this.animationEnded = once(() => {
          this.downloadImage(props);
        });
        this.isIdle = true;
      };

      if (this.isIdle) {
        return transitionFromImageToImage(nextProps);
      } else {
        this.onIdle = once(() => {
          transitionFromImageToImage(this.props);
        });
        return;
      }
    }

    // going from background => nothing
    if (this.hasSource() && !this.hasSource(nextProps)) {
      this.setAnimationClass('fade-out');

      this.animationEnded = once(() => {
        this.root._backgroundSrc = '';
        this.root.style.backgroundImage = '';
      });
    }

    // going from nothing => background
    if (!this.hasSource() && this.hasSource(nextProps)) {
      this.animationEnded = null;
      this.downloadImage(nextProps);
    }
  }

  hasSource = (props = this.props) => {
    return !!props.source;
  }

  setAnimationClass = animationClass => {
    const classNames = this.root.className.split(/\s+/);
    const newClassNames = classNames.map(className => {
      if (['fade-in', 'fade-out', 'loaded'].indexOf(className) >= 0) {
        return '';
      }

      return className;
    });

    newClassNames.push(animationClass);

    this.root.className = newClassNames.join(' ');
  }

  downloadImage({ source, options, alwaysFadeIn }: Properties) {
    if (source.indexOf('blob:') >= 0 || this.props.local) {
      this.root._backgroundSrc = source;
      return this.onLoad(source, alwaysFadeIn);
    }

    this.source = this.props.provider.getSource({ src: source, options });
    this.root._backgroundSrc = this.source;
    if (this.source in cache || this.source.indexOf('data:') === 0) {
      alwaysFadeIn = alwaysFadeIn === undefined ? true : alwaysFadeIn;
      return this.onLoad(this.source, alwaysFadeIn);
    }

    this.loadImage(this.source, (err, img) => {
      this.setCache(this.source, img);
      this.onLoad(this.source, true);
    });
  }

  setCache(source, img) {
    cache[source] = img;
  }

  getFromCache(source) {
    return cache[source];
  }

  onLoad(source, shouldAnimate) {
    if (!this.root) return;
    if (source === '') return;

    if (shouldAnimate) {
      this.setAnimationClass('fade-in');
      this.animationEnded = once(() => {
        this.setAnimationClass('loaded');
      });
    } else {
      this.setAnimationClass('loaded');
    }

    if (this.root._backgroundSrc !== source) {
      return;
    }

    const cacheImage = this.getFromCache(source);

    if (cacheImage) {
      this.setDimensions(cacheImage);
    }

    this.root.style.backgroundImage = `url("${encodeURI(source.replace('?dl=0', '?dl=1'))}")`;
    this.isIdle = true;
    this.setStyle();

    this.propagateLoadEvent();
    this.onIdle();
  }

  setDimensions(dimensions) {
    const { autoSize, autoHeight } = this.props;

    if (autoSize || autoHeight) {
      this.root.style.height = `${dimensions.height}px`;
    }

    if (autoSize) {
      this.root.style.width = `${dimensions.width}px`;
    }
  }

  propagateLoadEvent() {
    if (this.props.onImageLoad) this.props.onImageLoad();
  }

  rootNode = node => {
    this.root = node;
  }

  handleAnimationEnd = () => {
    this.animationEnded && this.animationEnded();
  }

  render() {
    const styles: React.CSSProperties = {};
    const className = classNames(
      'background-image',
      this.props.className,
      {
        'fade-double': this.props.fadeSpeed === 'medium',
        'hover-zoom': this.props.hoverZoom,
        'background-image__shaded': this.props.shaded,
      }
    );

    if (this.props.minHeight) {
      styles.minHeight = this.props.minHeight;
    }

    return (
      <div style={styles} className={className} ref={this.rootNode} onAnimationEnd={this.handleAnimationEnd} title={this.props.title} data-src={this.props.source}>
        {this.props.children}
      </div>
    );
  }
}
