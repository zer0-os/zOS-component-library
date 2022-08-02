import React from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames';

const NOT_LOADED_SIZE = '0px';

export interface Properties {
  url: string;
  className?: string;
  autoplay?: boolean;
}

interface State {
  width: string;
  height: string;
}

export class VideoPlayer extends React.Component<Properties, State> {
  state = { width: '0px', height: '0px' };

  private wrapperElement: HTMLElement;

  setWrapperElement = (ref: HTMLElement) => {
    this.wrapperElement = ref;

    if (ref) {
      this.updateStyles();
    }
  }

  updateStyles() {
    const { width: boundingWidth, height: boundingHeight } = this.wrapperElement.getBoundingClientRect();

    const ratio = 16 / 9;

    const width = Math.max(boundingWidth, boundingHeight * ratio);
    const height = Math.max(boundingHeight, boundingWidth / ratio);

    this.setState({
      width: width + 'px',
      height: height + 'px',
    });
  }

  get hasDimensions() {
    return this.state.width !== NOT_LOADED_SIZE && this.state.height !== NOT_LOADED_SIZE;
  }

  render() {
    const className = classNames('video-player', this.props.className);
    const playing = (this.props.autoplay === false) ? false : true;

    return (
      <div ref={this.setWrapperElement} className={className}>
        {this.hasDimensions && (
          <ReactPlayer
            playing={playing}
            controls
            height={this.state.height}
            width={this.state.width}
            url={this.props.url}
          />
        )}
      </div>
    );
  }
}
