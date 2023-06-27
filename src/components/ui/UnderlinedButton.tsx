import React from 'react';
import { CustomButton } from '.';
import styled from 'styled-components';
import { IButton, Sizes } from './types';

interface IUnderlinedButtonProps {
  children?: React.ReactNode;
  size: Sizes;
  className?: string;
  onClick: () => void;
}

const SUnderlinedButton = styled(CustomButton)<IUnderlinedButtonProps>`
  font-size: ${({ size, theme }) => theme.fontSizes[size]};
  font-weight: 500;
  text-decoration: underline;

  &:active {
    opacity: 0.8;
  }

  &:hover {
    text-decoration: none;
  }
`;

const UnderlinedButton = ({
  children,
  size = 'small',
  className,
  onClick,
  ...otherProps
}: IUnderlinedButtonProps & IButton) => {
  return (
    <SUnderlinedButton
      {...otherProps}
      onClick={onClick}
      className={className}
      size={size}
    >
      {children}
    </SUnderlinedButton>
  );
};

export default UnderlinedButton;
