import React from 'react';
import { default as ReactImageLightbox } from 'react-image-lightbox';
import { Context as EscapeManagerContext } from '../../lib/escape-manager';
import 'react-image-lightbox/style.css';

export interface Properties {
  items: any[];
  startingIndex?: number;
  onClose?: () => void;

  provider: any;
}

interface State {
  index: number;
}

export class Lightbox extends React.Component<Properties, State> {
  static contextType = EscapeManagerContext;

  constructor(props) {
    super(props);

    this.state = {
      index: this.props.startingIndex || 0,
    };
  }

  componentDidMount() {
    // This is conditional due to
    // incompatibilities between function and class components
    // in react and the resulting enzyme support.
    if (this.context?.register) {
      this.context.register(this.props.onClose);
    }
  }

  componentWillUnmount() {
    if (this.context?.unregister) {
      this.context.unregister();
    }
  }

  onClose = () => {
    this.props.onClose();
  }

  getPreviousItemIndex = (index, items) => {
    return (index + items.length - 1) % items.length;
  }

  onMovePrevious = () => {
    this.setState({ index: this.getPreviousItemIndex(this.state.index, this.props.items) });
  }

  getNextItemIndex = (index, items) => {
    return (index + items.length + 1) % items.length;
  }

  onMoveNext = () => {
    this.setState({ index: this.getNextItemIndex(this.state.index, this.props.items) });
  }

  get items() {
    const { items, provider } = this.props;
    return items.map(media => {
      if (media.type === 'image') {
        const options = provider.fitWithinBox(media);
        return provider.getSource({ src: media.url, options });
      }
      return media.url;
    });
  }

  render() {
    const items = this.items;
    const itemsLength = items.length;
    const index = this.state.index;

    const activeItem = items[index];
    const previousItem = itemsLength > 1 ? items[this.getPreviousItemIndex(index, items)] : null;
    const nextItem = itemsLength > 1 ? items[this.getNextItemIndex(index, items)] : null;

    return (
      <ReactImageLightbox
        mainSrc={activeItem}
        nextSrc={nextItem}
        prevSrc={previousItem}
        animationOnKeyInput
        enableZoom={false}
        wrapperClassName='lightbox'
        onCloseRequest={this.onClose}
        onMovePrevRequest={this.onMovePrevious}
        onMoveNextRequest={this.onMoveNext}
      />
    );
  }
}
