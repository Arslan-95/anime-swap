import React from 'react';
import styled from 'styled-components';

interface Props {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const SCustomButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
`;

const CustomButton = ({ children, onClick, className }: Props) => {
  return (
    <SCustomButton onClick={onClick} className={className}>
      {children}
    </SCustomButton>
  );
};

export default CustomButton;
