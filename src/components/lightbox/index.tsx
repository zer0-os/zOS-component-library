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

  closeLightBox = () => {
    this.props.onClose();
  }

  movePrevLightBox = () => {
    this.setState({ index: (this.state.index + this.props.items.length - 1) % this.props.items.length });
  }

  moveNextLightBox = () => {
    this.setState({ index: (this.state.index + 1) % this.props.items.length });
  }

  get items() {
    const { items, provider } = this.props;
    return items.map(media => {
      if (media.type === 'image') {
        const options = provider.fitWithinBox(media, 2000, 1500);
        return provider.getSource({src: media.url, options});
      }
      console.log(media);
      return media.url;
    });
  }

  render() {
    const items = this.items;
    const index = this.state.index;

    const numItems = items.length;
    const mainItem = items[index];
    const previousItem = numItems > 1 ? items[(index + numItems - 1) % numItems] : null;
    const nextItem = numItems > 1 ? items[(index + 1) % numItems] : null;

    return (
      <ReactImageLightbox
        mainSrc={mainItem}
        nextSrc={nextItem}
        prevSrc={previousItem}
        animationOnKeyInput
        enableZoom={false}
        wrapperClassName='lightbox'
        onCloseRequest={this.closeLightBox}
        onMovePrevRequest={this.movePrevLightBox}
        onMoveNextRequest={this.moveNextLightBox}
      />
    );
  }
}
