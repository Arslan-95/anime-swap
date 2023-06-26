import { breakpoints } from '@features/adaptive/breakpoints';
import React from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const SBox = styled.div`
  background: #141414;
  border-radius: 53px;
  padding: 30px 40px;

  @media ${breakpoints.tablet} {
    padding: 30px 20px;
    border-radius: 32px;
  }
`;

const Box: React.FC<Props> = ({ children, className }) => {
  return <SBox className={className}>{children}</SBox>;
};

export default Box;
