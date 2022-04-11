import React, { FC, useCallback } from 'react';
import classNames from 'classnames';

export interface Properties {
  label?: string;
  className?: string;

  onClick?: () => void;
}

export const Button: FC<Properties> = ({
  label,
  className,
  onClick,
  children,
  ...rest
}) => {
  const handleClick = useCallback(() => onClick && onClick(), []);

  return (
    <div
      className={classNames('button', className)}
      onClick={handleClick}
      {...rest}
    >
      <span className='button__label'>{label || children}</span>
    </div>
  );
};
