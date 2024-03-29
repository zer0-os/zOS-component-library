import React from 'react';
import classNames from 'classnames';

export interface Properties {
  onClick?: () => void;
  className?: string;
}

export class ContextPanelTab extends React.Component<Properties> {
  handleClick = () => this.props.onClick();

  render() {
    const className = classNames('context-panel-tab', this.props.className);

    return (
      <div className={className} onClick={this.handleClick}>
        <svg className='context-panel-tab__tab' viewBox="0 0 16 104" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="context-panel-tab__opacity-gradient">
              <stop className="context-panel-tab__opacity-gradient-first-stop" offset="0" />
              <stop className="context-panel-tab__opacity-gradient-third-stop" offset="45%" />
              <stop className="context-panel-tab__opacity-gradient-second-stop" offset="100%" />
            </linearGradient>
          </defs>
          <path d="M4.03079 89.9538L11.9692 78.0462C14.5975 74.1038 16 69.4716 16 64.7334V51.5V39.2666C16 34.5284 14.5975 29.8962 11.9692 25.9538L4.03079 14.0462C1.40251 10.1038 0 5.47158 0 0.733383V51.5V103.267C0 98.5284 1.40251 93.8962 4.03079 89.9538Z" />
        </svg>
        <div className='context-panel-tab__icon'>
          <span className='context-panel-tab__icon-item'></span>
          <span className='context-panel-tab__icon-item'></span>
          <span className='context-panel-tab__icon-item'></span>
        </div>
      </div>
    );
  }
}
