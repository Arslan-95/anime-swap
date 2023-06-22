import React from 'react';
import styled, { css } from 'styled-components';

interface IButton {
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  size?: 'small' | 'medium';
}

const buttonSizeStyles = {
  small: css`
    padding: 12px;
    font-size: 18px;
  `,
  medium: css`
    padding: 12px;
    font-size: 24px;
  `,
};

const SButton = styled.button<IButton>`
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 100%;
  background: #282828;
  border-left: 3px solid ${({ theme }) => theme.colors.main};
  border-right: 3px solid ${({ theme }) => theme.colors.main};
  transition: 0.5s all, 0.2s border;
  font-family: PocketMonk;
  cursor: pointer;

  ${({ size }) => buttonSizeStyles[size || 'medium']}

  &:hover {
    border-color: transparent;
  }

  &:active {
    background: ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.dark};
    box-shadow: 0px 0px 10px ${({ theme }) => theme.colors.main};
  }

  &:disabled {
    opacity: 0.8;
    pointer-events: none;
    border-color: ${({ theme }) => theme.colors.progress};
  }
`;

const Button = ({ className, children, onClick, disabled, size }: IButton) => {
  return (
    <SButton
      className={className}
      onClick={onClick}
      disabled={disabled}
      size={size}
    >
      {children}
    </SButton>
  );
};

export default Button;
