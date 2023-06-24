import React, { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

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
  ...otherProps
}: ICustomButtonProps) => {
  return (
    <SCustomButton
      {...otherProps}
      onClick={onClick}
      commonEffects={commonEffects}
      disabled={disabled}
      className={className}
    >
      {children}
    </SCustomButton>
  );
};

export default CustomButton;
