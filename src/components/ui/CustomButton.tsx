import React, { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';
import { IButton } from './types';

interface ICustomButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: React.ReactNode;
  commonEffects?: boolean;
  disabled?: boolean;
}

const commonEffectsStyles = css`
  transition: 0.2s transform;

  &:not(:active):hover {
    transform: scale(1.05);
  }
`;

const SCustomButton = styled.button<ICustomButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;

  ${({ commonEffects }) => commonEffects && commonEffectsStyles};
`;

const CustomButton = ({
  children,
  onClick,
  className,
  commonEffects = false,
  disabled,
  buttonType = 'button',
}: ICustomButtonProps & IButton) => {
  return (
    <SCustomButton
      onClick={onClick}
      commonEffects={commonEffects}
      disabled={disabled}
      className={className}
      type={buttonType}
    >
      {children}
    </SCustomButton>
  );
};

export default CustomButton;
