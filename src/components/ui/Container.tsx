import React from 'react';
import styled from 'styled-components';
import { mediaBreakpoints } from '@features/adaptive/breakpoints';

interface SContainerProps {
  maxWidth?: string;
  padding?: string;
}

interface Props extends SContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const SContainer = styled.div<SContainerProps>`
  max-width: ${(props) => `calc(${props.maxWidth} + ${props.padding} * 2)`};
  width: 100%;
  margin: 0 auto;
  padding: 0 ${(props) => props.padding || '30px'};

  @media ${mediaBreakpoints.tablet} {
    padding: 0 ${(props) => props.padding || '15px'};
  }
`;

const Container: React.FC<Props> = ({
  children,
  className,
  maxWidth = '1320px',
  padding,
}) => {
  return (
    <SContainer padding={padding} maxWidth={maxWidth} className={className}>
      {children}
    </SContainer>
  );
};

export default Container;
