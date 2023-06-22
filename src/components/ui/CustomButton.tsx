import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  commonEffects?: boolean;
}

const commonEffectsStyles = css`
  transition: 0.2s transform;

  &:not(:active):hover {
    transform: scale(1.05);
  }
`;

const SCustomButton = styled.button<Props>`
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
}: Props) => {
  return (
    <SCustomButton
      onClick={onClick}
      className={className}
      commonEffects={commonEffects}
    >
      {children}
    </SCustomButton>
  );
};

export default CustomButton;
