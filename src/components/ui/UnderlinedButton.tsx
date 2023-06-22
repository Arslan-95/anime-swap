import React from 'react';
import { CustomButton } from '.';
import styled from 'styled-components';

interface IUnderlinedButtonProps {
  children?: React.ReactNode;
  size: 'xsmall' | 'small';
  className?: string;
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
}: IUnderlinedButtonProps) => {
  return (
    <SUnderlinedButton className={className} size={size}>
      {children}
    </SUnderlinedButton>
  );
};

export default UnderlinedButton;
