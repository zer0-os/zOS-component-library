import React, { FC, useCallback } from 'react';
import classNames from 'classnames';

export interface Properties {
  label?: string;
  className?: string;

  onClick?: () => void;
  tabIndex?: number;
}

export const Button: FC<Properties> = ({
  label,
  className,
  onClick,
  children,
  tabIndex,
  ...rest
}) => {
  const handleClick = useCallback(() => onClick && onClick(), []);

  return (
    <div
      className={classNames(
        'button__connect-button',
        'button__container',
        'button__glow',
        className
      )}
      onClick={handleClick}
      tabIndex={tabIndex}
      {...rest}
    >
      <div className='button__content'>
        <div className='connect-wallet-button__container'>
          <strong
            className={classNames('connect-wallet-button__title', 'bold')}
          >
            {label || children}
          </strong>
        </div>
      </div>
      <div className='button__wash'></div>
    </div>
  );
};
